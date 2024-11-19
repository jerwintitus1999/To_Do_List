import mongoose from "mongoose";

const uploadTask = new mongoose.Schema({
    task: {type: String, require: true},
})

const uploadTaskModel = mongoose.model("UserTask", uploadTask)

export default uploadTaskModel