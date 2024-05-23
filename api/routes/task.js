const {
    createTask, 
    deleteTask, 
    editRealTime, 
    editRealDifficulty, 
    editTitle,
    completeTask,
    getActiveTasks,
    getCompletedTasks} = require('../controllers/task')
const express = require('express')
const router = express.Router()
const {isOwner} = require('../middleware/isOwner')



router.post('/create', createTask)
router.delete('/delete/:id', isOwner, deleteTask)
router.put('/edit/realTime/:id', isOwner, editRealTime)
router.put('/edit/realDifficulty/:id', isOwner, editRealDifficulty)
router.put('/edit/title/:id', isOwner,editTitle)
router.put('/complete/:id', completeTask)
router.get('/active', getActiveTasks)
router.get('/completed', getCompletedTasks)

module.exports = router