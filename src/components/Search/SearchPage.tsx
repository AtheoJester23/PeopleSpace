import { ChevronLeft, Search } from 'lucide-react'
import styles from './Search.module.css'
import { Link } from 'react-router-dom'

const SearchPage = () => {
  return (
    <main className={styles.mainCont}>
      <div className={styles.fixedContTop}>
        <Link to={"/"} className={styles.backBtn}>
          <ChevronLeft size={30}/>
        </Link>
        <input type="text" placeholder='Search...' />
        <button className={styles.searchBtn}>
            <Search size={25} aria-hidden="true"/>
        </button>        
      </div>
    </main>
  )
}

export default SearchPage
