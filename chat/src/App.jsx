import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Chats from './Chats'
import Login from './Login'


function App() {

  const [isloggedin,setloggedin]=useState(false)


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={isloggedin?<Navigate to="/chat" replace/>:<Login setloggedin={setloggedin} />}></Route>
          <Route path='/chat'element={isloggedin?<Chats/>:<Navigate to="/"/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
