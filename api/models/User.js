const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstname: {
        type: String, required:true
    },
    lastname: {
        type: String, required:true
    },
    email: {
        type: String, required:true, unique:true
    },
    password: {
        type: String, required:true
    },
    
    tasks: [{
        type:  mongoose.Schema.Types.ObjectId, ref: "Task"
    }],
    activity: {
        type: Boolean, default: false
    },
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", userSchema)