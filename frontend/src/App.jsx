import { useState } from 'react'
import Admin from '../components/Admin.jsx/Admin'

import LoginSignup from '../components/auth/Loginsignup'
import Home from '../components/Home/Home'


function App() {

  return (
    <>
      <LoginSignup/>
      <Admin/>
      
      <Home/>
      
    </>
  )
}

export default App
