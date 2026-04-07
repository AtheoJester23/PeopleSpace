import { useEffect, useState, type FormEvent, type SyntheticEvent } from "react"
import supabase from "../../config/supabaseClient"
import { replace, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../state/store"
import { addUser, setSession } from "../../state/auth/authSlice"
import { setProfile } from "../../state/profile/profileSlice"
import styles from './LoginPage.module.css'

type loginErrs = {
  email: boolean,
  password: boolean
}

const LoginPage = () => {
  const [errs, setErrs] = useState<loginErrs>({email: false, password: false})
  const dispatch = useDispatch<AppDispatch>();
  const session = useSelector((state: RootState) => state.auth.session);
  const profile = useSelector((state: RootState) => state.user.profile);
  const navigate = useNavigate();

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrs({email: false, password: false})

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const emailRegex = /^[\w.+-]+@[a-z0-9_]+(\.[a-z0-9]+)*\.[a-z]{2,}$/i
    const isValid = emailRegex.test(email)
    
    if(!email || !isValid){
      setErrs(prev => ({...prev, email: true}));
      return;
    }

    const passRegex = /^[^\p{Emoji}]*$/u
    const validPass = passRegex.test(password);

    if(!password || password.length < 5 ){
      setErrs(prev => ({...prev, password: true}));
      return;
    }

    console.log(email, password);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({email, password});
      
      if(authError) throw authError;
      // console.log("Logged in successfully: ", authData);
      
      dispatch(setSession({
        userId: authData.user.id,
        accesToken: authData.session.access_token
      }))

      
      const {data, error} = await supabase.from('profiles').select().eq("id", authData.user.id);

      if(error) throw error;

      // console.log(data[0]);

      dispatch(setProfile(data[0]))
      dispatch(addUser(data[0]))
      
      navigate("/home")
    } catch (error) {
      console.error((error as Error).message)
    }
  }

  useEffect(() => {
    if(session){
      navigate('/home', {replace: true})
    }
  }, [session, navigate])

  return (
    <main className={styles.mainContent}>
        <div className={styles.pageDesign}>
          <img src="/logo.png" className={styles.logo}/>
          <img src="3375888.jpg" className={styles.artDesign}/>
          <a href="http://www.freepik.com" style={{textDecoration: "none", color: "black", fontSize: "10px"}}>Designed by pikisuperstar / Freepik</a>
          <h1>Check with your <span style={{color: "#075B5E"}}>People</span>!</h1>
        </div>
        <section className={styles.formSection}>
            <form onSubmit={(e) => handleLogin(e)} className={styles.loginPageForm}>
                <h1>Log into PeopleSpace</h1>
                <div className={styles.loginThings}>
                  <fieldset className={styles.formInputs}>
                    <div style={{display: "flex", flexDirection: "column", gap: 7}}>
                      <input onChange={() => setErrs(prev => ({...prev, email: false}))} type="text" name="email" placeholder="Email"/>
                      {errs.email && (
                        <small style={{color: "red"}}>The email you entered isn't connected to an account.</small>
                      )}
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: 7}}>
                      <input onChange={() => setErrs(prev => ({...prev, password: false}))} type="text" name="password" placeholder="Password"/>
                      {errs.password && (
                        <small style={{color: "red"}}>The password you entered is incorrect.</small>
                      )}
                      
                    </div>
                  </fieldset>
                  <div className={styles.formBtns}>
                    <button className={styles.logInbtn}>Log in</button>
                    <a href="/" className={styles.frgtbtn}>Forgot Password?</a>
                    <a href="/reg" className={styles.signUpBtn}>Create new account</a>
                  </div>
                </div>

            </form>
        </section>
    </main>
  )
}

export default LoginPage
