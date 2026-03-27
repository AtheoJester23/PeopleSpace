import styles from './HomePage.module.css'
import { logout } from "../../services/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store';
import { User, UsersRound } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.auth.users);
  const session = useSelector((state: RootState) => state.auth.session);

  const testMainProf = () => {
    if(session){
      console.log(users.byId[session?.userId]);
    }
  }

  return (
    <main className={styles.mainCont}> 
      <section className={styles.left}>
        <div className={styles.leftBtns}>
          <User/>
          <p>Profile name</p>
        </div>
        <div className={styles.leftBtns}>
          <UsersRound/>
          <p>Friends</p>
        </div>
      </section>
      <section className={styles.mid}>
        <p>test</p>
      </section>
      <section className={styles.right}>
        <div>
          <p>testing</p>
        </div>
      </section>
    </main>
  )
}

export default HomePage
