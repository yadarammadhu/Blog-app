import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';  // Import the toast from react-hot-toast
import { useDispatch } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import { BaseUrl } from '../sevices/Endpoint';  // Import the BaseUrl from Endpoint

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // Define handleSubmit to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BaseUrl}/auth/login`, value); // Use the correct login endpoint
      if (response.status === 200) {
        dispatch(SetUser(response.data.user)); // Store the user data in Redux state
        toast.success('Logged in successfully!');
        navigate('/'); // Redirect to home page after login
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Login failed. Please try again.'); // Show error message
    }
  };

  return (
    <>
      <section className="bg-light">
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
          <a href="#" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
            <img
              className="me-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
              width="32"
              height="32"
            />
            <Link to={'/'}>
              <span className="h4 mb-0 fw-bold">ByteFlow</span>
            </Link>
          </a>
          <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
            <div className="card-body p-4">
              <h1 className="h5 mb-4 fw-bold text-dark">Sign in to your account</h1>
              <form onSubmit={handleSubmit}> {/* Ensure handleSubmit is called here */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your email</label>
                  <input
                    type="email"
                    name='email'
                    value={value.email}
                    onChange={handleChange}
                    className="form-control"
                    id="email"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    value={value.password}
                    onChange={handleChange}
                    name='password'
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign in</button>
              </form>
              <p className="mt-3 mb-0 text-muted">
                Don’t have an account yet? <Link to="/register" className="text-primary">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
