const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    estimated_time_min: {
        type: Number, required:true,
        validate: {
            validator: function(value) {
                // Check if the value is greater than or equal to zero
                return value > 0;
            },
            message: props => `${props.value} must be greater than zero!`
        }
    },
    estimated_difficulty: {
        type: String,
        required: true,
        enum: ['very easy', 'easy', 'medium', 'hard', 'very hard'],
    
    },
    real_time_min: {
        type: Number, required:true, default: 15,
        validate: {
            validator: function(value) {
                // Check if the value is greater than or equal to zero
                return value > 0;
            },
            message: props => `${props.value} must be greater than 0!`
        }
    },
    real_difficulty: {
        type: String,
        required: true,
        enum: ['very easy', 'easy', 'medium', 'hard', 'very hard'],
        default: 'medium'
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
    completed: {
        type: Boolean, default: false
    },
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Task", userSchema)