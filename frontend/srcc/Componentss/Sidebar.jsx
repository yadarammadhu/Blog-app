import React from 'react'
import { FaHome,FaPlus,FaUser,FaFileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
export default function Sidebar() {
  return (
   <>
   <div className="bg-dark text-white vh-100" style={{ width: '250px' }}>
    <div className='p-3'>
        <ul className='nav flex-column'>
            <li className='nav-item mb-3'>
            <Link to={'/dashboard'}className='nav-link text-white'>
            <FaHome className='me-2'/>Dashboard
            </Link>
            </li>
            <li className='nav-item mb-3'>
            <Link to={'/dashboard/addpost'}className='nav-link text-white'>
            <FaPlus className='me-2'/>Add Post
            </Link>
            </li>
            <li className='nav-item mb-3'>
            <Link to={'/dashboard/users'}className='nav-link text-white'>
            <FaUser className='me-2'/>All Users
            </Link>
            </li>
            <li className='nav-item mb-3'>
            <Link to={'/dashboard/allposts'}className='nav-link text-white'>
            <FaFileAlt className='me-2'/>All Posts
            </Link>
            </li>
        </ul>
    </div>
   </div>

   </>
  )
}
