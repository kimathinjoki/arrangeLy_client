import { useState } from 'react'
import './App.css'
import Hero from './components/hero/Hero'
import Login from './components/auth/Login'
import {Route, Routes} from 'react-router-dom'
import Signup from './components/auth/Signup'
import Main from './components/main/Main'
import Dashboard from './components/main/Dashboard'

function App() {
  

  return (
    <>

    <Routes>
      <Route path="/" element={<Hero />}>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Route>

      <Route path="/main" element={<Main/>}>
        <Route path='/main' element={<Dashboard />}/>
      </Route>
      
    </Routes>
      
    </>
  )
}

export default App
