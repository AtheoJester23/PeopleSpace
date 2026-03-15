import { ArrowLeft, Bell, MessageCircleMore, Search } from 'lucide-react'
import styles from './Navbar.module.css'
import { style } from 'framer-motion/client'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../state/store'
import { setTheme } from '../../state/theme/themeSlice'

const Navbar = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch<AppDispatch>()
  const searchRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLImageElement>(null)
  const [hidLogo, setHidLogo] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ){
        setHidLogo(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const handleFocusSearch = () => {
    setHidLogo(true);
  };

  return (
    <nav className={styles.mainNav}>
        <div className={styles.left}>
          <div className={styles.leftSideA}>
            {!hidLogo ? (
              <img src="/logo.png" alt="" className={styles.navLogo} ref={logoRef}/>
            ):(
              <button className={styles.backBtn} onClick={() => setHidLogo(false)}>
                <ArrowLeft/>
              </button>
            )}
          </div>
          <div className={styles.searchCont}>
            <input ref={searchRef} type="text" className={styles.searchBar} onFocus={() => handleFocusSearch()} placeholder='Search People'/>
            <Search className={styles.searchIcon} size={17}/>
          </div>
              
        </div>

        <div className={styles.right}>
          <button onClick={() => dispatch(setTheme(theme == "light" ? "dark" : "light"))}>
            {theme == "light" ? "light" : "dark"}
          </button>
          <button className={styles.rightSideIcons}>
            <MessageCircleMore size={20}/>
          </button>
          <button className={styles.rightSideIcons}>
            <Bell size={20}/>
          </button>
          <Link to={`/home`} className={styles.profPic}>
            <p className={styles.tempProf}>A</p>
          </Link>
        </div>
    </nav>
  )
}

export default Navbar
