import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import styles from './HomePage.module.css'

const HomePage = () => {
    const navigate = useNavigate();
    
  const handleTempLogout = async () => {
    try {
        const {error: authError} = await supabase.auth.signOut();

        if(authError) throw authError;

        console.log("Logged out successfully")

        navigate("/")
    } catch (error) {
        console.error((error as Error).message)
    }
  }
  
  return (
    <main className={styles.mainCont}>
      
      <button onClick={() => handleTempLogout()}>Logout</button>
    </main>
  )
}

export default HomePage
