import { Outlet, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../state/store"
import { useEffect, useState } from "react"
import { addUser, setSession } from "../../state/auth/authSlice"
import { getSession } from "../../services/auth"
import { setMyProf, setProfile } from "../../state/profile/profileSlice"
import styles from './Mainlayouts.module.css'
import supabase from "../../config/supabaseClient"

const MainLayouts = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams();

  useEffect(() => {
    const checkSesh = async () => {
      try {
        const res = await getSession();

        if(!res){
            dispatch(setSession(null));
            // dispatch(setProfile(null));
            return;
        }

        const {data, error} = await supabase.from('profiles').select().eq('id', id);

        if(error) throw error

        dispatch(setSession({
          userId: res.session.user.id,
          accesToken: res.session.access_token
        }))
        
        dispatch(addUser(res.data));
      } catch (error) {
        console.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    checkSesh();
  }, [])
  
  if(loading){
    return(
      <div className={styles.wholeScreen}>
        Loading abcdefg...
      </div>
    )
  }

  return (
    <>
        <Navbar/>
        <Outlet/> 
    </>
  )
}

export default MainLayouts
