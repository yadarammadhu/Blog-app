import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
export default function User() {
  const users = [
    {id:1,name:'Madhu chary',email:'madhuchary@gmail.com'},
    {id:2,name:'Karthik',email:'karthik@gmail.com'},
    {id:2,name:'naveen',email:'naveen@gmail.com'}
  ];
  const handleDelete=()=>{
    try {
      alert('user Deleted Successfully')
    } catch (error) {
      
    }
  }
  return (
    <>
      <div className="container ">
        <h1 className=" text-white mb-4">Users</h1>
        <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index)=>{
                return(
                  <tr scope='row'>
                <th>{index+1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                  className='btn btn-danger'
                     onClick={() => handleDelete(user._id)}
                     >
                    <FaTrashAlt />Delete
                  </button>
                </td>

              </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
