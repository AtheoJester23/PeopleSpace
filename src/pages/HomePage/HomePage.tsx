import styles from './HomePage.module.css'
import { logout } from "../../services/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';

const HomePage = () => {
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.auth.users);
  const session = useSelector((state: RootState) => state.auth.session);

  const handleLogout = async () => {
    try {
      await logout()

      navigate("/")
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  const testMainProf = () => {
    if(session){
      console.log(users.byId[session?.userId]);
    }
  }

  return (
    <main className={styles.mainCont}> 
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => testMainProf()}>Check</button>
    </main>
  )
}

export default HomePage
