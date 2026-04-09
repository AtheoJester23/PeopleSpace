import styles from './HomePage.module.css'
import { Image, User, UsersRound, Video } from 'lucide-react';

const HomePage = () => {
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
        <div className={styles.postNew}>
          <div className={styles.profDisp}>
            <User/>
          </div>
          <button className={styles.postBtn}>
            What's on your mind today?
          </button>
          <div style={{display: "flex", gap: "5px"}}>
            <button className={styles.postOptVid}>
              <Video size={30}/>
            </button>
            <button className={styles.postOpt}>
              <Image size={30}/>
            </button>
          </div>
        </div>
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
