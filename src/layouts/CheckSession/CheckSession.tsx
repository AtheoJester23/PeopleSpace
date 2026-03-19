import { useDispatch, useSelector } from 'react-redux'
import styles from './CheckSession.module.css'
import type { AppDispatch, RootState } from '../../state/store'
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { setSession } from '../../state/auth/authSlice';
import { setProfile } from '../../state/profile/profileSlice';

const CheckSession = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      try {
        const {data: authData, error: authError} = await supabase.auth.getSession();

        if(authError) throw authError;

        dispatch(setSession(authData.session));

        if(!authData.session) return;

        const {data, error} = await supabase.from("profiles").select().eq("id", authData.session?.user.id);

        if(error) throw error;

        dispatch(setProfile(data[0]));

        navigate('/home')
      } catch (error) {
        console.log((error as Error).message)
      } finally {
        setLoading(false);
      }
    }

    if(session === undefined){
      getSession();
    }
  }, [session, dispatch])
  
  useEffect(() => {
    if(session){
      navigate('/home', {replace: true})
    }
  }, [session, navigate])


  if(loading && session === undefined){
    return(
      <div className={styles.wholeScreen}>
          <p>Loading</p>
        </div>
    )
  }

  if (session) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet/>
}

export default CheckSession
