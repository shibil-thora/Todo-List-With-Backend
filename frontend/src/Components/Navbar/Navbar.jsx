import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Redux/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const state = useSelector(state => state.auth); 
  const [showProfiile, setShowProfile] = useState(false); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  return (
    <nav className="bg-sky-950 text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold ml-2">To Do</span>
        </div>
        {/* <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300">Dashboard</a>
          <a href="#" className="hover:text-gray-300">Products</a>
          <a href="#" className="hover:text-gray-300">Customers</a>
          <a href="#" className="hover:text-gray-300">Sales</a>
          <a href="#" className="hover:text-gray-300">Reports</a>
        </div> */}
        <div className="flex items-center">
          <button
          onClick={() => setShowProfile(true)}
           className="bg-fuchsia-900 hover:bg-fuchsia-700 text-xl active:bg-fuchsia-800 text-white px-5 py-2 rounded-full">
            {state.user.email ? state.user.email[0] : '..'}
          </button>
        </div>
      </div> 

      {showProfiile && <div className="inset-0 fixed h-full z-20">
          <div className="md:w-1/6 shadow-xl  w-1/3 bg-red-100 h-52 rounded-md ml-auto mr-5 mt-16 flex flex-col space-y-3">
            <div className="close flex justify-between px-2">
              <button className='invisible'>hi</button>
              <button
              onClick={() => setShowProfile(false)}
              className="hover:text-red-600 text-red-600 active:text-red-700">X</button>
            </div> 
            <div className=" flex items-center">
            <small className="bg-white mx-auto
             font-medium text-gray-800 px-3 py-2 border border-gray-400 rounded-full"><i className="fa-brands fa-google text-lime-700"></i></small>
            </div>
            <div className=" flex items-center">
            <small className="bg-white mx-auto
             font-medium text-gray-800 px-2 py-2 border border-gray-400 rounded-3xl">{state.user.email}</small>
            </div>
            <button 
            onClick={() => {
              dispatch(logOut()) 
              navigate('/login/'); 
            }}
            className=" flex items-center">
            <small className="bg-white mx-auto hover:bg-gray-200 active:bg-gray-300
             font-medium text-gray-800 px-3 py-2 border border-gray-400 rounded-full"><i className="fa-solid fa-arrow-right-from-bracket text-red-700"></i></small>
            </button>
          </div>
      </div>}
    </nav>
  );
}

export default Navbar;
