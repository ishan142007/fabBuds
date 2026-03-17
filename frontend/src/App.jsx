import { useState } from 'react'
import Admin from '../components/Admin/Admin'

import LoginSignup from '../components/auth/Loginsignup'
import Home from '../components/Home/Home'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Cart from '../components/Cart/Cart'
import Ai from '../components/Aichatbot/Ai'
function App() {
  const [login, setlogin] = useState(false)
  const navigate = useNavigate();


  return (
    <>

      {/* <LoginSignup/>
      <Admin/> */}


      <Routes path="/" element={<App />}>
        {/* <Route path='' element={<Home />} />
        <Route path='LoginSignup' element={<LoginSignup setlogin={setlogin} />} />
        <Route path='Admin' element={(login) ? <Admin /> : <Navigate to='/' replace />} />
        <Route path='Cart' element={(login) ? <Cart /> : <Navigate to='/' replace />} />
        <Route path='Admin' element={<Admin/>}/> */}

        <Route path='Ai' element={<Ai/>} />

      </Routes>


    </>
  )
}

export default App
