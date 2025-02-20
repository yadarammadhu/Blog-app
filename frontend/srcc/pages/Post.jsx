import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Use axios to make the request

export default function Dashboard() {
  const [posts, setPosts] = useState(0);
  const [users, setUsers] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/dashboard'); // Correct API endpoint
        console.log(response.data); // Check the structure of the data
        setPosts(response.data.Posts);  // Update the state with the correct data
        setUsers(response.data.Users);  // Assuming the backend returns these fields
        setComments(response.data.Comments);

      } catch (error) {
        console.log(error);
      }
    };

    GetData();
  }, []); // Empty dependency array means this will run only once on mount

  return (
    <>
      <div>
        <h2 className='mb-4 text-white'>Dashboard</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">{users}</p>  {/* Use state directly */}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Posts</h5>
                <p className="card-text">{posts}</p>  {/* Use state directly */}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Comments</h5>
                <p className="card-text">{comments}</p>  {/* Use state directly */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
