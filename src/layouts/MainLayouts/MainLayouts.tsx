import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../state/store"
import { useEffect, useState } from "react"
import { addUser, setSession, type User } from "../../state/auth/authSlice"
import { getSession } from "../../services/auth"
import { setMyProf, setProfile } from "../../state/profile/profileSlice"
import styles from './Mainlayouts.module.css'
import supabase from "../../config/supabaseClient"
import { ChevronLeft, Ellipsis, Pencil, Search } from "lucide-react"

const MainLayouts = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams();

  const loc = useLocation();

  const [width, setWidth] = useState<number>(window.innerWidth);
  const users = useSelector((state: RootState) => state.auth.users);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const handleGetProf = async () => {
      try {
        const {data, error} = await supabase.from('profiles').select().eq('id', id);

        if(error) throw error;

        setCurrentUser(data[0]);

      } catch (error) {
        console.error((error as Error).message)
      }
    }

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

        handleGetProf();
        
      } catch (error) {
        console.error((error as Error).message);
      } finally{
        setLoading(false);
      }
    }

    const handleResize = () => {
      setWidth(window.innerWidth);
      console.log("This: ", window.innerWidth);
    }


    checkSesh();

    window.addEventListener("resize", handleResize);
    return () => removeEventListener('resize', handleResize);
  }, [width])
  
  if(loading){
    return(
      <div className={styles.wholeScreen}>
        Loading abcdefg...
      </div>
    )
  }

  console.log(session);

  return (
    <>
        {width <= 412
          ? (
              <>
                {loc.pathname.split('/')[1] == "profile"
                  ? (
                  <nav className={styles.mobNav}>
                    <Link to={'/'} className={styles.mobNavIcons}>
                      <ChevronLeft  size={30}/>
                    </Link>
                    <p className={styles.userName}>{currentUser?.username}</p>
                    <div className={styles.mobNavRight}>
                      <Link to={"/EditProfile"} className={styles.mobNavIcons}>
                        <Pencil/>
                      </Link>
                      <Link to={"/Search"} className={styles.mobNavIcons}>
                        <Search/>
                      </Link>
                      <Link to={"/ProfileMobileSettings"} className={styles.mobNavIcons}>
                        <Ellipsis/>
                      </Link>
                    </div>
                  </nav>
                  )
                  : <Navbar/>
                }
              </>
          ) 
          : <Navbar/>
        }
        <Outlet/> 
    </>
  )
}

export default MainLayouts
