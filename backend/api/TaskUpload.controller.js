import mongoose from "mongoose";
import uploadTaskModel from "../models/taskUpolad.model.js";

const AddTask = async(req, res)=>{
   
    try {
        const {task} = req.body
        const savedTask = await uploadTaskModel({task}).save();
        res.send(savedTask)
        
    } catch (error) {
        res.send(error)
    }
}

const getTask = async(req,res)=>{
    try {
        const retriveTask = await uploadTaskModel.find()
        res.send(retriveTask)
        
    } catch (error) {
        res.send(error)
    }
}

const deleteTask = async(req,res)=>{
    const {id} = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID");
        
        return res.status(400).send({ message: "Invalid ID format" });

    }
    try {
        const deleteTask = await uploadTaskModel.findByIdAndDelete(id)
        res.send(deleteTask)
        console.log(deleteTask);
        
    } catch (error) {
        res.send(error)
    }
}

const updateTask = async(req, res)=>{
    const {id, task} = req.body
    console.log(req.body);
    console.log(id);
    console.log(task);
    try {
        const updateTask = await uploadTaskModel.findByIdAndUpdate(id, {task: task})
        res.send(updateTask)
    } catch (error) {
        res.send(error)
    }
}

export {AddTask, getTask, deleteTask, updateTask}