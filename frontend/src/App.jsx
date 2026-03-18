import { useState } from 'react'
import Admin from '../components/Admin/Admin'

import LoginSignup from '../components/auth/Loginsignup'
import Home from '../components/Home/Home'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Cart from '../components/Cart/Cart'
import Chatbox from '../../extra/aii'
import BottomNavbar from '../components/auth/bottom'
import Cart1 from '../../extra/Cart1'
import Admin1 from '../../extra/faltu'


function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [login, setlogin] = useState(false)
  const navigate=useNavigate();
  

  return (
    <>
    
      {/* <LoginSignup/>
      <Admin/> */}
{/* <Cart1/> */}
{/* <Admin1/>
<Chatbox/>
<BottomNavbar/> */}
    
    <Routes path="/" element={<App/>}>
    <Route path='' element={<Home />} />
    <Route path='LoginSignup' element={<LoginSignup setlogin={setlogin}/>}   />
    <Route path='Admin' element={(login)?<Admin/>:<Navigate to='/' replace/>}/>
    <Route path='Cart' element={(login)?<Cart/>:<Navigate to='/' replace />}/>
    {/* <Route path='Admin' element={<Admin/>}/> */}
    


    </Routes>
      
      
    </>
  )
}

export default App
