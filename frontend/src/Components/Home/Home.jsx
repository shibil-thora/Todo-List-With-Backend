import React, { useEffect, useState } from 'react'
import { getToDoList } from '../../ApiServices/services'
import Sale from '../Sale/Sale'

function Home() { 

  const [tasks, setTasks] = useState(['task1']);   
  const 

  useEffect(() => {
    getToDoList().then((res) => {
      setTasks(res.data)
    })
  }, [])

  return ( 
    <>
    <div className="p-8">
     <ul className="list-none p-0">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between bg-slate-200 p-4 rounded-md mb-2 font-medium">
          <span>{task.name}</span>
          <div>
            <button className={`${task.completed ? 'bg-lime-600': 'bg-fuchsia-900'} zoom-hover hover:bg-lime-500 active:bg-lime-700
             text-white px-2 py-1 rounded-md mr-2`}>
              {task.completed && <small>Complete <i className="fa fa-check "></i></small>}
              {!task.completed && <strike><small className=""> Completed</small></strike>}
            </button>
            <button className="bg-rose-600 zoom-hover hover:bg-rose-500 active:bg-rose-700
             text-white px-2 py-1 rounded-md">
              <small>Delete <i className="fa fa-close "></i></small>
              </button>
          </div>
        </li>
      ))}
    </ul>
    </div>
    </>
  )
}

export default Home