import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import SigninPage from './pages/SigninPage/SigninPage'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/reg' element={<SigninPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
