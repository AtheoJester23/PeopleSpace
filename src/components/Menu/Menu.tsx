import { Link, useNavigate } from 'react-router-dom'
import styles from './Menu.module.css'
import { ChevronLeft, Circle, LogOut, MessageCircleMore, Moon, Search, Settings, UsersRound } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../state/store'
import { useState } from 'react'
import type { User } from '../../state/auth/authSlice'
import { setTheme } from '../../state/theme/themeSlice'
import { logout } from '../../services/auth'

const Menu = () => {
    const session = useSelector((state: RootState) => state.auth.session);
    const users = useSelector((state: RootState) => state.auth.users);
    const [currentUser, setCurrentUser] = useState<User | null>(users.byId[session!.userId] || null);

    console.log(users.byId[session!.userId]);

    const theme = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const handleDarkMode = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
    }

    const handleLogout = () => {
        logout();
        navigate("/");
      }
  return (
    <main className={styles.mainCont}>
        <header className={styles.fixedContainerTop}>
            <nav aria-label='Menu navigation' style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                <Link to={"/"} className={styles.fixedContBtns} aria-label='Go back'>
                    <ChevronLeft aria-hidden="true"/>
                </Link>
                <h1>Menu</h1>
                <Link to={"/Search"} className={styles.fixedContBtns} aria-label='Search'>
                    <Search aria-hidden="true"/>
                </Link>
            </nav>
        </header>

        <Link to={`/profile/${session?.userId}`} className={styles.viewProfBtn}>
            <div className={styles.profPic}>
                A
            </div>
            <div className={styles.viewProfText}>
                <p>{currentUser?.username}</p>
                <small>View your profile</small>
            </div>
        </Link>
        <div className={styles.otherMenuOptions}>
            <div className={styles.optBtn}>
                <MessageCircleMore/>
                <p>Messages</p>
            </div>
            <div className={styles.optBtn}>
                <UsersRound/>
                <p>Friends</p>
            </div>
        </div>

        <hr />

        <ul className={styles.settingsOptList}>
            <li>
                <Link to={'/settings'} className={styles.Link}>
                    <Settings aria-hidden="true"/>
                    <p>
                        Settings
                    </p>
                </Link>
            </li>
            <li onClick={() => handleDarkMode()}>
                <button type='button' role='switch' aria-label='Toggle dark mode' aria-checked={theme !== 'light'}>
                    <div>
                        <Moon/>
                        <p>
                            Dark mode
                        </p>
                    </div>

                    <div className={styles.toggleBtn} style={{backgroundColor: theme === "light" ? "gray" : "#2845D6", justifyContent: theme !== 'light' ? 'right' : 'left'}}>
                        <Circle fill={theme === 'light' ? 'rgb(80,80,80)' : '#0D1A63'} strokeOpacity={0}/>
                    </div>
                </button>
            </li>
            <li onClick={() => handleLogout()}>
                <button type='button'>
                    <div>
                        <LogOut aria-hidden="true"/>
                        <p>
                            Logout
                        </p>
                    </div>
                </button>
            </li>
        </ul>
    </main>
  )
}

export default Menu
