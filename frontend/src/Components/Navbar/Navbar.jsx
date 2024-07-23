import React from 'react';

function Navbar() {
  return (
    <nav className="bg-sky-950 text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold ml-2">My To Do</span>
        </div>
        {/* <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300">Dashboard</a>
          <a href="#" className="hover:text-gray-300">Products</a>
          <a href="#" className="hover:text-gray-300">Customers</a>
          <a href="#" className="hover:text-gray-300">Sales</a>
          <a href="#" className="hover:text-gray-300">Reports</a>
        </div> */}
        <div className="flex items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
