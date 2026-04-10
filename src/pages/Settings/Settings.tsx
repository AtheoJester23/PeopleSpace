import { Link } from 'react-router-dom'
import styles from './Settings.module.css'
import { ArrowLeft, HatGlasses, Search, Shield, Trash2 } from 'lucide-react'

const Settings = () => {
  return (
    <main className={styles.mainCont}>
        <div className={styles.fixedContTop}>
            <Link to={'/menu'} className={styles.icon}>
                <ArrowLeft/>
            </Link>

            <p>Settings & privacy</p>

            <div>
                <Search/>
            </div>
        </div>

        <div style={{marginTop: "10px"}}>
            <section className={styles.settingsSec}>
                <h1 className={styles.title}>Account Center</h1>

                <div>
                    <Link to={'/'} className={styles.passNSec}>
                        <Shield aria-hidden="true"/>
                        <p>Password & security</p>
                    </Link>
                </div>

                <div>
                    <Link to={'/'} className={styles.passNSec}>
                        <Trash2 aria-hidden="true"/>
                        <p>Delete your account</p>
                    </Link>
                </div>
            </section>
            
            <section className={styles.settingsSec}>
                <h1 className={styles.title}>Audience and visibility</h1>

                <div>
                    <Link to={'/'} className={styles.passNSec}>
                        <HatGlasses />
                        <p>Active Status</p>
                    </Link>
                </div>
            </section>
        </div>

      
    </main>
  )
}

export default Settings
