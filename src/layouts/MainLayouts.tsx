import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { useEffect } from "react"
import supabase from "../config/supabaseClient"
import { setSession } from "../state/auth/authSlice"

const MainLayouts = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    async function getSession(){
      try {
        const {data, error} = await supabase.auth.getSession();

        if(error) throw error;

        dispatch(setSession(data.session))
      } catch (error) {
        console.log((error as Error).message)
      }
    }

    getSession();
  }, [])

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  // not logged in
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
        <Navbar/>
        <Outlet/> 
    </>
  )
}

export default MainLayouts
