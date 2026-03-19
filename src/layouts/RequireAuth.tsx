import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { useEffect } from "react"
import supabase from "../config/supabaseClient"
import { setSession } from "../state/auth/authSlice"
import { getSession } from "../services/auth"
import { setProfile } from "../state/profile/profileSlice"

const RequireAuth = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkSesh = async () => {
        const res = await getSession();

        if(!res){
            dispatch(setSession(null));
            dispatch(setProfile(null));
            return;
        }

        dispatch(setSession(res?.session));
        dispatch(setProfile(res?.data));
    }

    checkSesh();
  }, [])

  if (session === undefined) {
    return <div>Loading abcdefg...</div>;
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

export default RequireAuth
