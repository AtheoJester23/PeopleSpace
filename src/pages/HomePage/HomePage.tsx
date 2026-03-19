import styles from './HomePage.module.css'
import { logout } from "../../services/auth";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()

      navigate("/")
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return (
    <main className={styles.mainCont}> 
      <button onClick={handleLogout}>Logout</button>
    </main>
  )
}

export default HomePage
