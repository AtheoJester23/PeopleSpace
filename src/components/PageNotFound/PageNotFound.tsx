import { Link } from 'react-router-dom'
import styles from './PageNotFound.module.css'

const PageNotFound = () => {
  return (
    <main className={styles.mainCont}>
      <h1>Page not found</h1>
      <p>This page does not exist</p>
      <Link to="/">
        Go back to home page
      </Link>
    </main>
  )
}

export default PageNotFound
