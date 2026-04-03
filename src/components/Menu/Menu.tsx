import { Link } from 'react-router-dom'
import styles from './Menu.module.css'
import { ChevronLeft, Search } from 'lucide-react'

const Menu = () => {
  return (
    <main className={styles.mainCont}>
        <div className={styles.fixedContainerTop}>
            <Link to={"/"} className={styles.fixedContBtns}>
                <ChevronLeft/>
            </Link>
            <h1>Menu</h1>
            <Link to={"/search"} className={styles.fixedContBtns}>
                <Search/>
            </Link>
        </div>
    </main>
  )
}

export default Menu
