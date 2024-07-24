import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import Sale from './Components/Sale/Sale'
import Home from './Components/Pages/Home'
import {} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Pages/Login'

function App() {
   

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='login/' element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
