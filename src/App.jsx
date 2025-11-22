import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Transactions from './pages/Transactions'
import Tasks from './pages/Tasks'
import Register from './pages/Register'
import Login from './pages/Login'
import { useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import AuthWrapper from './components/AuthWrapper'

const App = () => {


const location = useLocation()
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname)

  if (isAuthPage) {
    return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    )
  }



  return (
   
      <div className="flex">
        <Sidebar/>
      <Routes>
          
          <Route path='/dashboard' element={
            <AuthWrapper>
              <Dashboard/>
            </AuthWrapper>
          } />
          <Route path='/transactions' element={
            <AuthWrapper>
              <Transactions/>
            </AuthWrapper>
          } />
          <Route path='/tasks' element={
            <AuthWrapper>
              <Tasks/>
            </AuthWrapper>
          } />
          <Route path='/settings' element={
            <AuthWrapper>
              <Settings/>
            </AuthWrapper>
          } />

      </Routes>
      
      </div>

    
  )
}

export default App