import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import SigninPage from './pages/SigninPage/SigninPage'
import HomePage from './pages/HomePage/HomePage'
import MainLayouts from './layouts/MainLayouts/MainLayouts'
import { useSelector } from 'react-redux'
import type { RootState } from './state/store'
import { useEffect } from 'react'
import Profile from './pages/Profile/Profile'
import CheckSession from './layouts/CheckSession/CheckSession'
import RequireAuth from './layouts/RequireAuth'
import PageNotFound from './components/PageNotFound/PageNotFound'

function App() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CheckSession/>}>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/reg' element={<SigninPage/>}/>
        </Route>

        <Route element={<RequireAuth/>}>
          <Route path='/home' element={<HomePage/>}/>
        </Route>

        <Route element={<MainLayouts/>}>
          <Route path='/profile/:id' element={<Profile/>}/>
        </Route>

        <Route path='*' element={<PageNotFound/>}/>

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
