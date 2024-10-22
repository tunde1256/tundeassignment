const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); // Assuming this is the correct path to your user controller

// Route for getting all users
router.post('/register', userController.register);
router.get('/users', userController.getAllUser);

module.exports = router;
