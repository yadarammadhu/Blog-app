import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Use axios to make the request

export default function Dashboard() {
  const [posts, setPosts] = useState([]);  // Corrected state name to "posts"
  const [users, setUsers] = useState([]);  // Corrected state name to "users"
  const [comments, setComments] = useState(0);  // Corrected state name to "comments"

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/dashboard'); // Correct API endpoint
        const data = response.data;  // Get the response data
        console.log(data);

        // Set state with the correct response data
        setPosts(data.Posts);
        setUsers(data.Users);
        setComments(data.comments);  // Assuming the response has a "comments" field for count
      } catch (error) {
        console.log(error);
      }
    };

    GetData();
  }, []);

  return (
    <>
      <div>
        <h2 className='mb-4 text-white'>Dashboard</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">{users.length}</p>  {/* Display total users count */}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Posts</h5>
                <p className="card-text">{posts.length}</p>  {/* Display total posts count */}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Comments</h5>
                <p className="card-text">{comments}</p>  {/* Display total comments count */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
