import { useParams } from 'react-router-dom'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react';
import supabase from '../../config/supabaseClient';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        const getUserProf = async () => {
            try {
                setLoading(true)
                const {data, error} = await supabase.from('profiles').select().eq("id", id);
                
                if(error) throw error;

                console.log(data);

            } catch (error) {
                console.log((error as Error).message)
            }finally{
                setLoading(false)
            }
        }

        getUserProf();
    }, [])

  return (
    <main className={styles.mainContent}>
        {loading ? (
            <p>Loading</p>
        ):(
            <div className={styles.profBanner}>
                <div className={styles.bannerImgCont}>
                    <img src="/randy-fath-e-OGWPEM4O0-unsplash.jpg" alt=""/>
                </div>
            </div>
        )}

      
    </main>
  )
}

export default Profile
