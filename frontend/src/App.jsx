import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import Sale from './Components/Sale/Sale'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home' 

function App() {
   

  return (
    <>
       <Navbar />
       <Home />
    </>
  )
}

export default App
