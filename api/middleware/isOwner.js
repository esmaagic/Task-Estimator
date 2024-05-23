const Task = require('../models/Task');

//check if current user is owner of task from path
exports.isOwner = async (req, res, next) => {
    try {
      const userId = req.session.user?._id; // Null check for req.session.user
      const taskId = req.params.id;
      
      if (!userId) {
        return res.status(401).send('Not authorized'); // If user is not logged in
      }
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).send('Task not found'); // If task with the given ID doesn't exist
      }
  
      if (userId.equals(task.user_id)) {
        return next(); // User is the owner of the task
      } else {
        return res.status(401).send('Not authorized'); // User is not the owner of the task
      }
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  };