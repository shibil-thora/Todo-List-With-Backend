import React, { useState } from 'react'

function EditModal(props) {
    const [error, setError] = useState('');

    function onSubmit() {
        props.onEditSubmit()
    }
  return (
    <div className="inset-0 fixed h-full flex flex-col justify-center bg-black bg-opacity-60 z-20">
        <div className="flex flex-col w-1/3 h-1/3 mx-auto bg-gray-200  shadow-lg rounded-xl">
          <div className=" bg-sky-950 flex justify-between flex-grow text-center rounded-t-xl">
            <button></button>
          <button 
          onClick={() => props.close(false)}
          className="zoom-hover bg-orange-600 shadow-md
          mx-2 px-2 my-1  rounded-md hover:bg-opacity-90 active:bg-orange-700">
              <i className="fa fa-close text-md text-white"></i>
          </button>
          </div>
        <div className="my-4 flex-grow mt-4 mx-8 text-center"> 
                <h2 className="text-black font-medium mb-1 text-center">Edit</h2>
        <input type="text" 
        required
        value={props.editQuery.task}
        onChange={(e) => props.setEditQuery({...props.editQuery, task: e.target.value})}
        className=" px-2 py-2 shadow-md w-full  border border-cyan-500
        bg-white-200 focus:outline-none focus:ring-0 rounded-xl"/>
        <h1 className="text-sm text-red-600 text-center">{error}</h1>
        <button
        onClick={() => onSubmit()}
      className="mx-auto mt-4 text-white w-40 py-2 rounded-xl
       font-medium zoom-hover shadow-md bg-lime-600 hover:bg-lime-500 active:bg-lime-700">
        Save
      </button> 
      </div>
        </div>
    </div>
  )
}

export default EditModal