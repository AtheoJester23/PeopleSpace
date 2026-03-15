import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import SigninPage from './pages/SigninPage/SigninPage'
import HomePage from './pages/HomePage/HomePage'
import MainLayouts from './layouts/MainLayouts'
import { useSelector } from 'react-redux'
import type { RootState } from './state/store'
import { useEffect } from 'react'

function App() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/reg' element={<SigninPage/>}/>
        <Route element={<MainLayouts/>}>
          <Route path='/home' element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
