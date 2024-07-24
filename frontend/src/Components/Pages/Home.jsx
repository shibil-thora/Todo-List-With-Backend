import React, { useEffect, useState } from 'react'
import { CreateToDo, DeleteTask, EditTask, getToDoList, MarkComplete } from '../../ApiServices/services'
import Sale from '../Sale/Sale'
import EditModal from '../EditModal/EditModal';
import Navbar from '../Navbar/Navbar';

function Home() { 

  const [tasks, setTasks] = useState(['task1']);   
  const [newTask, setNewTask] = useState(''); 
  const [editQuery, setEditQuery] = useState({}); 
  const [showEditForm, setShowEditForm] = useState(false); 

  useEffect(() => {
    getToDoList().then((res) => {
      setTasks(res.data)
    })
  }, []) 

  function addTask() {
    console.log('task add')  
    setNewTask('')  
    CreateToDo(newTask).then((res) => {
      console.log(res.data)
      setTasks([...tasks, res.data])
    })
  } 

  function doComplete(id) { 
    MarkComplete(id).then((res) => { 
      const newTasks = [...tasks] 
      const index = newTasks.findIndex((task) => task.id == id)  
      newTasks[index] = {...newTasks[index], completed:true}
      setTasks(newTasks); 
    })
  } 

  function deleteTask(id) { 
    DeleteTask(id).then((res) => {
      setTasks(tasks.filter(task => task.id != id)); 
    })
  } 

  function EditToDo(task) { 
    setEditQuery(task) 
    console.log(task)
    setShowEditForm(true); 
  } 

  function EditToDoSubmit() {
    EditTask(editQuery.id, editQuery.name).then((res) => {
      const newTasks = [...tasks] 
      const index = newTasks.findIndex((task) => task.id == editQuery.id)  
      newTasks[index] = {...newTasks[index], name:editQuery.name}
      setTasks(newTasks);  
      setShowEditForm(false)
    })
    
  }

  return ( 
    <>  
    <Navbar />
    {showEditForm && 
    <EditModal editQuery={editQuery} 
    onEditSubmit={EditToDoSubmit} close={setShowEditForm}
    setEditQuery={setEditQuery}/> 
    }
    
    <div className="p-8">
    <div className="mb-4">
       
       <input 
       value={newTask}
       onKeyDown={(e) => {
        if (e.code === 'Enter') {
          addTask(); 
        }
       }}
       onChange={(e) => setNewTask(e.target.value)}
         type="text"
         placeholder={'add task...'}
         className="shadow text-gray-700 bg-slate-200
         appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
 
       />
     </div>
     <ul className="list-none p-0">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between bg-indigo-200 p-4 rounded-md mb-2 font-medium">
          <span><i 
          onClick={() => EditToDo(task)}
          tabIndex={0} className="cursor-pointer text-white fas fa-pencil bg-fuchsia-700 p-2 shadow zoom-hover rounded"></i> &nbsp; 
          {!task.completed && <span>{task.name}</span>}
          {task.completed && <span><strike>{task.name}</strike></span>}
           
          </span>
          <div> 


            <button
            onClick={
              (e) => {
                if (!task.completed)
                  doComplete(task.id)
              }}
             className={`${task.completed ? 'bg-lime-700': 'bg-lime-600'} zoom-hover hover:bg-lime-500 active:bg-lime-700
             text-white px-2 py-1 rounded-md mr-2`}>
              {!task.completed && <small>Complete <i className="fa fa-check "></i></small>}
              {task.completed && <strike><small className=""> Completed</small></strike>}
            </button>
            <button
            onClick={() => deleteTask(task.id)}
            className="bg-rose-600 zoom-hover hover:bg-rose-500 active:bg-rose-700
             text-white px-2 py-1 rounded-md">
              <small>Remove <i className="fa fa-close "></i></small>
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