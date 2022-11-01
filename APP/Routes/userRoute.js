const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userController');
const loginValidator = require('../Middlewares/loginValidator');
const validator = require('../Middlewares/registrationValidatorMiddleware');

// set middleware to protect routes
router.use('/register', validator.registrationSchema,validator.validateRequestSchema);
router.use('/userLogin',loginValidator.loginSchema, loginValidator.validateRequestSchema);

// public route



// protected routes
router.post('/register', UserController.userRegistration);
router.post('/verifyEmail', UserController.verifyOTP);
router.post('/userLogin', UserController.userLogin);










module.exports = router;