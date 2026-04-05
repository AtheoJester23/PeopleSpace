import { Link } from 'react-router-dom'
import styles from './Menu.module.css'
import { ChevronLeft, Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../state/store'
import { useState } from 'react'
import type { User } from '../../state/auth/authSlice'

const Menu = () => {
    const session = useSelector((state: RootState) => state.auth.session);
    const users = useSelector((state: RootState) => state.auth.users);
    const [currentUser, setCurrentUser] = useState<User | null>(users.byId[session!.userId] || null);

    console.log(users.byId[session!.userId]);

  return (
    <main className={styles.mainCont}>
        <div className={styles.fixedContainerTop}>
            <Link to={"/"} className={styles.fixedContBtns}>
                <ChevronLeft/>
            </Link>
            <h1>Menu</h1>
            <Link to={"/Search"} className={styles.fixedContBtns}>
                <Search/>
            </Link>
        </div>
        <Link to={`/profile/${session?.userId}`} className={styles.viewProfBtn}>
            <div className={styles.profPic}>
                A
            </div>
            <div className={styles.viewProfText}>
                <p>{currentUser?.username}</p>
                <small>View your profile</small>
            </div>
        </Link>
    </main>
  )
}

export default Menu
