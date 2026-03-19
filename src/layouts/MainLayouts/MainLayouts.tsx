import { Outlet, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../state/store"
import { useEffect, useState } from "react"
import { setSession } from "../../state/auth/authSlice"
import { getSession } from "../../services/auth"
import { setProfile } from "../../state/profile/profileSlice"
import styles from './Mainlayouts.module.css'

const MainLayouts = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams();

  console.log(`this is id: ${id}`)

  useEffect(() => {
    const checkSesh = async () => {
      try {
        const res = await getSession();

        if(!res){
            dispatch(setSession(null));
            dispatch(setProfile(null));
            return;
        }

        dispatch(setSession(res?.session));
        dispatch(setProfile(res?.data));
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
