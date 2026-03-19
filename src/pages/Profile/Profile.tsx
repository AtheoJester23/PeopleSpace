import { useParams } from 'react-router-dom'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react';
import supabase from '../../config/supabaseClient';
import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';

const Profile = () => {
    const userProf = useSelector((state: RootState) => state.user.profile);
    
    if(userProf){
        console.log(userProf)
    }

  return (
    <main className={styles.mainContent}>
        <div className={styles.profBanner}>
            <div className={styles.bannerImgCont}>
                <img src="/randy-fath-e-OGWPEM4O0-unsplash.jpg" alt=""/>
            </div>
        </div>

        <div>
            <div>
                <div className={styles.profImgCont}>
                    <img src="/logo.png" alt="" />
                </div>
            </div>
        </div>

      
    </main>
  )
}

export default Profile
