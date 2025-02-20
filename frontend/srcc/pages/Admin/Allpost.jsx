import React from 'react'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
export default function Allpost() {
  return (
    <>
      <div className="container ">
        <h1 className="text-center mb-4 text-white">All Posts</h1>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="https://img.freepik.com/free-photo/flat-lay-growing-plants_23-2149198328.jpg?t=st=1739679405~exp=1739683005~hmac=a75bb9afc86054fd0118979f7e399dc20a70f9bf6d34eb6be0e2baf4e1441685&w=740" alt="" />
              <div className="card-body">
                <h5 className="card-title">My First Blog</h5>
                <p className="card-text">it is a plant</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-danger"

                >
                  <FaTrashAlt /> Delete
                </button>
                <button
                  className="btn btn-warning"
                >
                  <FaEdit /> Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
