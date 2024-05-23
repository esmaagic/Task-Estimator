const Task = require('../models/Task');
const User = require('../models/User');




exports.getCurrentUser = async (req,res)=> {
    try {
        const user = await User.findById(req.session.user._id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteCurrentUser = async(req,res) =>{
    try {
        const userId = req.session.user._id;

        // Delete user document
        await User.findByIdAndDelete(userId);

        // Delete all tasks associated with the user
        await Task.deleteMany({ user_id: userId });

        res.status(200).json({ message: 'User and associated tasks deleted successfully' });
    } catch (error) {
        console.error('Error deleting user and tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}