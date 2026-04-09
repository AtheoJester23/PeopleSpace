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
    const [currentUser, _] = useState<User | null>(users.byId[session!.userId] || null);

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

        <Link to={`/profile/${session?.userId}`} className={styles.viewProfBtn} aria-label='View your profile'>
            <div className={styles.profPic} aria-hidden="true">
                A
            </div>
            <div className={styles.viewProfText}>
                <p>{currentUser?.username}</p>
                <small>View your profile</small>
            </div>
        </Link>

        <nav className={styles.otherMenuOptions} aria-label='Menu options'>
            <Link to={"/messages"} className={styles.optBtn}>
                <MessageCircleMore aria-hidden="true"/>
                <span className={styles.uiLabels}>Messages</span>
            </Link>
            <Link to={'/friends'} className={styles.optBtn}>
                <UsersRound aria-hidden="true"/>
                <span className={styles.uiLabels}>Friends</span>
            </Link>
        </nav>

        <hr />

        <ul className={styles.settingsOptList}>
            <li>
                <Link to={'/settings'} className={styles.Link}>
                    <Settings aria-hidden="true"/>
                    <span className={styles.uiLabels}>
                        Settings
                    </span>
                </Link>
            </li>
            <li>
                <button onClick={() => handleDarkMode()} type='button' role='switch' aria-checked={theme !== 'light'}>
                    <div>
                        <Moon aria-hidden="true"/>
                        <span className={styles.uiLabels}>
                            Dark mode
                        </span>
                    </div>

                    <div className={styles.toggleBtn} style={{backgroundColor: theme === "light" ? "gray" : "#2845D6", justifyContent: theme !== 'light' ? 'flex-end' : 'flex-start'}}>
                        <Circle aria-hidden="true" fill={theme === 'light' ? 'rgb(80,80,80)' : '#0D1A63'} strokeOpacity={0}/>
                    </div>
                </button>
            </li>
            <li>
                <button type='button' onClick={() => handleLogout()}>
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
