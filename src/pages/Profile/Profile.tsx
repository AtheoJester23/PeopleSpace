import styles from './Profile.module.css'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';
import { ChevronDown } from 'lucide-react';

const Profile = () => {
    const userProf = useSelector((state: RootState) => state.user.profile);
    const session = useSelector((state: RootState) => state.auth.session);

    useMemo(() => {
        if(userProf){
            console.log(userProf)
        }
    }, [userProf])

  return (
    <main className={styles.mainContent}>
        <div className={styles.profBanner}>
            <div className={styles.bannerImgCont}>
                <img src="/randy-fath-e-OGWPEM4O0-unsplash.jpg" alt=""/>
            </div>
        </div>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
            <div className={styles.profDeets}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "20px"}}>
                    <div className={styles.profImgCont}>
                        <img src="/logo.png" alt="" />
                    </div>
                    
                    <div>
                        <h1>{userProf?.username} testing</h1>

                    </div>
                </div>

                <div>
                    {true ? (
                        <>
                            <button>Add to story</button>
                            <button>Edit Profile</button>
                            <button>
                                <ChevronDown/>
                            </button>
                        </>
                    ):(
                        <>
                            <button>Add friend</button>
                            <button>Message</button>
                            <button>
                                <ChevronDown/>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>

      
    </main>
  )
}

export default Profile
