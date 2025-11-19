import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Transactions from './pages/Transactions'
import Tasks from './pages/Tasks'
import AuthPage from './pages/Auth'
import { useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'

const App = () => {


const location = useLocation()
  const isAuthPage = ['/auth', '/'].includes(location.pathname)

  if (isAuthPage) {
    return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<AuthPage/>} />
      </Routes>
    )
  }



  return (
   
      <div className="flex">
        <Sidebar/>
      <Routes>
          
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/transactions' element={<Transactions/>} />
          <Route path='/tasks' element={<Tasks/>} />
          <Route path='/settings' element={<Settings/>} />
        
      </Routes>
      
      </div>

    
  )
}

export default App