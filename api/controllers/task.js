const Task = require('../models/Task');
const User = require('../models/User');



exports.createTask = async (req, res) => {
    try {
        const { title, estimated_time_min, estimated_difficulty } = req.body.data;
        const userId = req.session.user._id
    

        const newTask = new Task({
            title,
            estimated_time_min,
            estimated_difficulty,
            user_id : userId,
        });


        await newTask.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.tasks.push(newTask._id);
        await user.save();


        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; 

        const task = await Task.findById(taskId);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Remove the task from the tasks array of the corresponding user
        await User.findByIdAndUpdate(task.user_id, {
            $pull: { tasks: taskId }
        });



        // Delete the task
        await Task.findByIdAndDelete(taskId);

        res.status(204).send('Task deleted successfully' );
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.editRealTime = async (req, res) => {
    const taskId = req.params.id;
    const {newTime} = req.body;

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
        return res.status(404).json({ error: 'Task not found' });
        }

        // Update the title field
        task.real_time_min = newTime;
        
        // Save the updated task
        await task.save();

        res.status(200).json({ message: 'Task real time updated successfully', task });
    } catch (err) {
        console.error('Error updating task real time:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.editRealDifficulty = async (req, res) => {
    const taskId = req.params.id;
    const {newDifficulty} = req.body;

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
        return res.status(404).json({ error: 'Task not found' });
        }

        // Update the title field
        task.real_difficulty = newDifficulty;
        
        // Save the updated task
        await task.save();

        res.status(200).json({ message: 'Task real difficulty updated successfully', task });
    } catch (err) {
        console.error('Error updating task real difficulty:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.editTitle = async (req, res) => {
    const taskId = req.params.id;
    const {newTitle} = req.body;

    try {
        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
        return res.status(404).json({ error: 'Task not found' });
        }

        // Update the title field
        task.title = newTitle;
        
        // Save the updated task
        await task.save();

        res.status(200).json({ message: 'Task title updated successfully', task });
    } catch (err) {
        console.error('Error updating task title:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.completeTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.session.user._id; // Null check for req.session.user

      
      if (!userId) {
        return res.status(401).send('Not authorized'); // If user is not logged in
      }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
    
        // Set the completed field to true
        task.completed = true;

        // Save the updated task
        await task.save();

        res.status(200).json({ message: 'Task marked as completed', task });
    } catch (error) {
        console.error('Error marking task as completed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getActiveTasks = async(req,res) => {
    try {
        const userId = req.session.user._id;
        const tasks = await Task.find({ user_id:userId, completed: false });
        res.status(200).json(tasks);
      } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

exports.getCompletedTasks = async(req,res) => {
    try {
        const userId = req.session.user._id;
        const tasks = await Task.find({ user_id:userId, completed: true });
        res.status(200).json(tasks);
      } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
}