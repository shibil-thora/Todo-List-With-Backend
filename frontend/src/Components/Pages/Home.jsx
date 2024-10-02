import React, { useEffect, useState } from 'react'
import EditModal from '../EditModal/EditModal';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() { 

  const [tasks, setTasks] = useState(['task1']);   
  const [newTask, setNewTask] = useState(''); 
  const [editQuery, setEditQuery] = useState({}); 
  const [showEditForm, setShowEditForm] = useState(false); 
  const state = useSelector(state => state.auth)
  const navigate = useNavigate(); 
  const email = 'nice@gmail.com';

  useEffect(() => {
    // getToDoList().then((res) => {
    //   setTasks(res.data)
    // }) 
    const tasks = localStorage.getItem(email)
    const taskArray = getArray(tasks) 
    const newTaskState = []
    for (let i=0; i<taskArray?.length; i++) {
      if (taskArray[i]?.length) {
        newTaskState.push({id: i, ...getTaskObj(taskArray[i])}); 
      }
    }
    
    setTasks(newTaskState);

  }, []) 

  function getArray(taskStr) { 
    return taskStr?.split('^');
  }

  function getTaskObj(task) {
    const singleTaskArray = task?.split('&')
    if (singleTaskArray) {
      return {
        task: singleTaskArray[0], 
        completed: Boolean(Number(singleTaskArray[1])),
      }
    }
  }

  function getStoreString(arrOfObjs) { 
    let output = ''
    for (let i=0; i< arrOfObjs?.length; i++) {
      const singleObj = arrOfObjs[i] 
      const requiredString = `${singleObj.task}&${singleObj.completed ? 1 : 0}` 
      output += requiredString + '^' 
    }
    
    return output
  }

  function addTask() { 
    if (newTask.trim().length) {
    setNewTask('')  
    const tasks = localStorage.getItem(email)
    localStorage.setItem(email, `${tasks}^${newTask}&0`) 
    setTasks((prev) => [...prev, {id: prev?.length, task: newTask, completed: false}])
    }
  } 

  function doComplete(id) { 
      const newTasks = [...tasks] 
      const index = newTasks.findIndex((task) => task.id == id)  
      newTasks[index] = {...newTasks[index], completed:true}
      setTasks(newTasks); 
      const storage_str = getStoreString(newTasks); 
      localStorage.setItem(email, storage_str);
  } 

  function deleteTask(id) { 
    const deletFiltered = tasks.filter(task => task.id != id)
    const storage_str = getStoreString(deletFiltered); 
    localStorage.setItem(email, storage_str);
    setTasks(deletFiltered);

  } 

  function EditToDo(task) { 
    setEditQuery(task) 
    setShowEditForm(true); 
  } 

  function EditToDoSubmit() {
    
      const newTasks = [...tasks] 
      const index = newTasks.findIndex((task) => task.id == editQuery.id)  
      newTasks[index] = {...newTasks[index], task:editQuery.task}
      setTasks(newTasks);  
       
      const storage_str = getStoreString(newTasks); 
      localStorage.setItem(email, storage_str);
      setShowEditForm(false)
    
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
    <div className="mb-4 flex justify-between space-x-2">
       
       <input 
       value={newTask}
       onKeyDown={(e) => {
        if (e.code === 'Enter') {
          addTask(); 
        }
       }}
       onChange={(e) => 
            { if (!(e.target.value.includes('^') || e.target.value.includes('&'))){
              setNewTask(e.target.value)
              }
              
            }
        }
         type="text"
         placeholder={'add task...'}
         className="shadow text-gray-700 bg-slate-200
         appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
 
       />
       <button
            onClick={() => addTask()}
             className="zoom-hover bg-fuchsia-800 hover:bg-lime-500 active:bg-lime-700
             text-white px-2 py-1 rounded-md mr-2"> Add
            </button>
      
     </div>
     <ul className="list-none p-0">
      {tasks
      .filter((task) => task.task != 'null')
      .map((task) => (
        <li key={task.id} className="flex items-center justify-between bg-indigo-200 p-4 rounded-md mb-2 font-medium">
          <span><i 
          onClick={() => EditToDo(task)}
          tabIndex={0} className="cursor-pointer text-white fas fa-pencil bg-fuchsia-700 p-2 shadow zoom-hover rounded"></i> &nbsp; 
          {!task.completed && <span>{task.task}</span>}
          {task.completed && <span><strike>{task.task}</strike></span>}
           
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
            <button disabled={true}
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
    <div className="flex justify-center">
    <button
    onClick={() => navigate('/mqtt/')}
    className="bg-gray-600 zoom-hover hover:bg-gray-500 active:bg-gray-700
    text-white px-2 py-1 rounded-md">
    <small>MQTT</small>
    </button>
    </div> 
    </>
  )
}

export default Home