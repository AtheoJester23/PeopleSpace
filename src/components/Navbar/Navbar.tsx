import { ArrowLeft, Bell, ChevronRight, LogOut, Menu, MessageCircleMore, Moon, Search, Settings } from 'lucide-react'
import styles from './Navbar.module.css'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../state/store'
import { setTheme } from '../../state/theme/themeSlice'
import { logout } from '../../services/auth'
import type { User } from '../../state/auth/authSlice'

const Navbar = () => {
  const session = useSelector((state: RootState) => state.auth.session);

  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch<AppDispatch>()
  const searchRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLImageElement>(null)
  const [hidLogo, setHidLogo] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  //Profile Dropdown
  const [openProfDrop, setOpenProfDrop] = useState(false)
  const profRef = useRef<HTMLDivElement>(null)
  const users = useSelector((state: RootState) => state.auth.users)

  const navigate = useNavigate();
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ){
        setHidLogo(false)
      }

      if(
        profRef.current &&
        !profRef.current.contains(e.target as Node)
      ){
        setOpenProfDrop(false);
        console.log("testing")
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const handleFocusSearch = () => {
    setHidLogo(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  useEffect(() => {
    if(session){
      setCurrentUser(users.byId[session.userId]);
    }
  }, [])

  console.log(currentUser);

  return (
    <>
      {session ? (
        <>
          <nav className={styles.mainNav}>
              <div className={styles.left}>
                <div className={styles.leftSideA}>
                  {!hidLogo ? (
                    <Link to={"/"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <img src="/logo.png" alt="" className={styles.navLogo} ref={logoRef}/>
                    </Link>
                  ):(
                    <button className={styles.backBtn} onClick={() => setHidLogo(false)}>
                      <ArrowLeft/>
                    </button>
                  )}
                </div>
                <div className={styles.searchCont}>
                  <input ref={searchRef} type="text" className={styles.searchBar} onFocus={() => handleFocusSearch()}/>
                  <Search className={styles.searchIcon} size={17}/>
                </div>
                    
              </div>
      
              <div className={styles.right}>
                <button onClick={() => dispatch(setTheme(theme == "light" ? "dark" : "light"))}>
                  {theme == "light" ? "light" : "dark"}
                </button>
                <button className={styles.rightSideIcons}>
                  <MessageCircleMore size={20}/>
                  <p className={styles.hoverIcon}>Messages</p>            
                </button>
                <button className={styles.rightSideIcons}>
                  <Bell size={20}/>
                  <p className={styles.hoverIcon}>Notification</p>
                </button>
                <div className={styles.profPic} onClick={() => setOpenProfDrop(prev => !prev)}>
                  <p className={styles.tempProf}>A</p>
                  <p className={styles.hoverProf}>Profile</p>
                  {openProfDrop && (
                    <div className={styles.profDropDown} ref={profRef}>
                      <ul>
                        <li>
                          <Link to={`/profile/${currentUser!.id}`} className={styles.dropDownOption}>
                            <div className={styles.dropDownPic}>
                              <img src="/logo.png" alt="" />
                            </div>
                            {currentUser!.username}
                          </Link>
                        </li>
                        <li>
                          <div className={styles.rightSideIcons}>
                            <Settings/>
                          </div>
                          <p>Settings & privacy</p>
                          <ChevronRight/>
                        </li>
                        <li>
                          <div className={styles.optName}>
                            <div className={styles.rightSideIcons}>
                              <Moon/>
                            </div>
                            <p>Display</p>
                          </div>
                          <ChevronRight/>
                        </li>
                        <li onClick={() => handleLogout()}>
                          <div className={styles.optName}>
                            <div className={styles.rightSideIcons}>
                              <LogOut/>
                            </div>
                            <p>Logout</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
          </nav>
          
          {/* Mobile nav */}
          <nav className={styles.mobNav}>
            <div className={styles.left}>
              <div className={styles.leftSideA}>
                <Link to={"/"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <img src="/logo.png" alt="" className={styles.navLogo} ref={logoRef}/>
                </Link>
              </div>                  
            </div>
    
            <div className={styles.rMobNav}>
              <Link to={"/Search"} className={styles.mSearchBtn}>
                <Search className={styles.searchIcon} size={17}/>
              </Link>
              <div className={styles.mMenu}>
                <Menu size={16}/>
              </div>
            </div>
        </nav>
        </>
      ):(
        <nav className={styles.mainNav}>
            <div className={styles.left}>
              <Link to={"/"} style={{marginLeft: "15px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <img src="/logo.png" alt="" className={styles.navLogo} ref={logoRef}/>
              </Link>
            </div>
    
            <div className={styles.right}>

              <input type="text" name="" id="" placeholder='Email or Phone'/>
    
              <input type="text" name="" id="" placeholder='Password'/>
              <button>Login</button>
            </div>
        </nav>
      )}
    </>
  )
}

export default Navbar
