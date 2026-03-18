import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Ai from '../../extra/aii'
import Footer from '../components/auth/footer'
import BottomNavbar from '../components/auth/bottom'
import Admin1 from '../../extra/faltu'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <App />
   
  <BottomNavbar/>

  </StrictMode>,
  </BrowserRouter>
)
