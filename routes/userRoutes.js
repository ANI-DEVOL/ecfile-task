const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Display the signup form
router.get('/signup', UserController.showSignupForm);

// Handle user registration
router.post('/signup', UserController.signupUser);


router.post('/verifyOtp', UserController.verifyOtp);

// Handle user login
router.post('/login', UserController.loginUser);




module.exports = router;
