import styles from './Profile.module.css'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';
import { ChevronDown, Pencil, Plus } from 'lucide-react';
import { style } from 'framer-motion/client';

const Profile = () => {
    const userProf = useSelector((state: RootState) => state.user.profile);
    const theme = useSelector((state: RootState) => state.theme.mode);

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
                        <h1 className={styles.profName}> testing</h1>
                        <div className={styles.profCounts}>
                            <span>friends</span>
                            <span>post</span>
                        </div>
                    </div>
                </div>

                <div className={styles.profOption}>
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
        
        <hr />

        <div className={styles.profActions}>
            <button className={styles.addStory}>
                <Plus aria-hidden="true"/>
                Add to story
            </button>

            <button className={styles.editProf}>
                <Pencil aria-hidden="true" fill={theme == 'ligth' ? 'white' : 'black'}/>
                Edit profile
            </button>
        </div>

      
    </main>
  )
}

export default Profile
