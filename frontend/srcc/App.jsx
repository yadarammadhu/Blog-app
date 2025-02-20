import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
 
import Home from './pages/Home'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserLayout from './Layouts/UserLayout'
import AdminLayout from './Layouts/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import Addpost from './pages/Admin/Addpost'
import User from './pages/Admin/User'
import Allpost from './pages/Admin/Allpost'
import {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'; 
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='post/:id' element={<Post />} />
          <Route path='profile/:id' element={<Profile />} />
        </Route>
        
        {/* Admin routes */}
        <Route path='/dashboard' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='addpost' element={<Addpost />} />
          <Route path='users' element={<User />} />
          <Route path='allposts' element={<Allpost />} />
        </Route>

        {/* Auth routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
