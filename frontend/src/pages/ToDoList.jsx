import { useEffect, useState } from "react"
import axios from 'axios'

const ToDoList = ()=>{

    const [task, setTask] = useState("")
    const [retriveTask, setRetriveTask] = useState([])
    useEffect(()=>{
        getTaskData();
    },[task])

    const getTaskData = async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/retriveTask')
            setRetriveTask(response.data)
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleInput = (e)=>{
        setTask(e.target.value)
    }
    const onSubmitHandle = async() => {
        try {
            const response = await axios.post('http://localhost:8000/uploadTask',{task: task} )
            console.log(response.data);
            setTask("")
            getTaskData();
        } catch (error) {
            console.log(error);
        }
    
    }
    const onDeleteHandle = async(id) =>{
        console.log("ID: ",id);
        try {
            const response = await axios.post('http://localhost:8000/deleteTask',{id: id})
            console.log(`Delete Responce:${response}`);
            getTaskData();
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const onUpdateHandle = async(id, updatedTask)=>{
        try {
            const response = await axios.put('http://localhost:8000/updateTask', {id: id,task: updatedTask})
            console.log(response.data);
            getTaskData()
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div>
            <div>
                <h1>TO DO List</h1>
                <input onChange={handleInput} type="text" placeholder="Enter the task" value={task}/>
                <button onClick={onSubmitHandle}>ADD</button>
            </div>
            <div>
                {retriveTask.map((retrivedTask, index) =>(
                    <div className="flex">
                        <p key={index}>{retrivedTask.task}</p>
                        <button className="text-red-600" onClick={()=>{onDeleteHandle(retrivedTask._id)}}>X</button>
                        <button
                        className="text-blue-600" onClick={() => {
                            const updatedTask = prompt("Edit Task:", retrivedTask.task);
                            
                            
                            if (updatedTask) {
                                console.log("Update:",updatedTask);
                                onUpdateHandle(retrivedTask._id, updatedTask);
                            }
                        }}>UPDATE</button>
                    </div>

                    ))}
            </div>
        </div>
    )
}

export default ToDoList