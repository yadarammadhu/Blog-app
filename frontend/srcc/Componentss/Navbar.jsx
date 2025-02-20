import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RemoveUser } from '../redux/AuthSlice';  // Correct import for RemoveUser
import { BaseUrl } from '../sevices/Endpoint';  // Correct path for BaseUrl
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Navbar() {
  const [islogin, setIslogin] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const request = await axios.post(`${BaseUrl}/auth/logout`);
      const response = request.data;

      if (request.status === 200) {
        dispatch(RemoveUser());  // Dispatch RemoveUser action to clear user state
        toast.success(response.message);  // Show success message
        navigate('/login');  // Redirect to login page
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <nav className='navbar d-flex justify-content-between align-items-center p-3'>
        <Link to={'/'}><h1 className="mx-5 text-white fs-2 fw-bold">ByteFlow</h1></Link>
        <div className='d-flex align-items-center'>
          {!user ? (
            <Link to={'/login'}>
              <button className="btn_sign mx-3">Sign in</button>
            </Link>
          ) : (
            <div className='dropdown'>
              <div className="avatar-container pointer rounded-circle overflow-hidden bg-info"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: '40px', height: '40px', cursor: "pointer" }}
              >
                <img
                  src={user?.profile ? `${BaseUrl}/images/${user.profile}` : "https://via.placeholder.com/40"}
                  alt="User Profile"
                  style={{ objectFit: 'cover', width: '40px', height: '40px', display: 'block' }}
                />
              </div>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                {user.role === 'admin' && <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>}
                <li><Link className="dropdown-item" to={`/profile/${user._id}`}>Profile</Link></li>
                <li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={handleLogout}>Sign Out</a></li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
