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



function App() {
  
  const [login, setlogin] = useState(false)
  const navigate=useNavigate();
  

  return (
    <>
    {/* <TopNavbar/> */}
      
   
    <Routes path="/" >
    <Route path='' element={<Home />} />
    <Route path='LoginSignup' element={<LoginSignup setlogin={setlogin}/>}   />

    <Route path='profile' element={<Customer/>}/>
    
    <Route path='Admin' element={(1)?<Admin/>:<Navigate to='/' replace/>}/>
    <Route path='Cart' element={(1)?<Cart/>:<Navigate to='/' replace />}/>

    {/* <Route path='Admin' element={<Admin/>}/> */}
    
      
    </Routes>
    
    
      <Footer/>
      <BottomNavbar/>
    </>
    
  )
}

export default App
