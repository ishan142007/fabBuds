import { useState } from 'react'
import Admin from './components/Admin/Admin'

import LoginSignup from './components/auth/Loginsignup'
import Home from './components/Home/Home'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Cart from './components/Cart/Cart'
import BottomNavbar from './components/auth/bottom'
import TopNavbar from './components/auth/Top'
import Footer from './components/auth/footer'
import Customer from './components/Profile/CustProfile'
import Admin1 from './components/Admin/Admin'
import Productform from './components/Cart/productform'
import CartPage from './components/Cart/Cart'
import Sidebar from './components/auth/Sidebar'
import Rout from './Rout'




function App() {
  
  const [login, setlogin] = useState(false)
  const navigate = useNavigate();


  return (
    <>
    {/* <TopNavbar/> */}
      
 
   <Rout/>
   
    </>
    
  )
}

export default App
