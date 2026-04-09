import { Link } from 'react-router-dom'
import styles from './Settings.module.css'
import { ArrowLeft, Search } from 'lucide-react'

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
      
    </main>
  )
}

export default Settings
