import React, { useEffect, useState } from 'react'
import { getProductList } from '../../ApiServices/services'
import Sale from '../Sale/Sale'

function Home() { 


  return ( 
    <>
     <ul className="list-none p-0">
      {tasks.map((task, index) => (
        <li key={index} className="flex items-center justify-between bg-slate-200 p-4 rounded-md mb-2">
          <span>{task}</span>
          <div>
            <button className="bg-blue-600 text-white px-2 py-1 rounded-md mr-2">Completed</button>
            <button className="bg-red-600 text-white px-2 py-1 rounded-md">Delete</button>
          </div>
        </li>
      ))}
    </ul>
    </>
  )
}

export default Home