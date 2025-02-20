import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useSelector } from 'react-redux'

export default function AdminLayout() {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);
  return (
      <>
      <Navbar/>
      <div className='d-flex'>
        <Sidebar/>
        <div className="content flex-grow-1 p-4">
        <Outlet/>
        </div>
      </div>
      </>
  )
}

