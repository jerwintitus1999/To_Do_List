import express from "express"
import cors from "cors"
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { AddTask, deleteTask, getTask, updateTask } from "./controllers/TaskUpload.controller.js";

const port = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/uploadTask', AddTask )

app.get('/retriveTask', getTask)

app.post('/deleteTask', deleteTask)

app.put('/updateTask', updateTask)

app.use('/', (req, res)=>{
    res.send("Hello from backend")
})


app.listen(port, ()=>console.log(`Backend is running on port: ${port}`))
connectDB();