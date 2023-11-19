var express = require('express');
var router = express.Router();

/* GET users listing. */

const adminController = require('../controllers/adminController')


// Handle user list
router.get('/userList', adminController.userList);

module.exports = router;
