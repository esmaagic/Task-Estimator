const express = require('express')
const router = express.Router()
const {getCurrentUser, deleteCurrentUser} = require('../controllers/user')



router.get('/me',getCurrentUser );
router.delete('/me',deleteCurrentUser );
module.exports = router