const { body, validationResult } = require('express-validator');
const userModel = require('../Models/userModel');

const loginSchema = [

    body('email').isEmail().withMessage({
        message: 'Not an email',
        errorCode: 403,
      }),
]

const validateRequestSchema = async (req, res, next) => {

    const errors = validationResult(req);
    if (req.body.email && req.body.password) {
        const user = await userModel.findOne({ email: req.body.email });
        if(user == null){
          return res.status(403).json({ 'massege': 'Please SignUp before login' });
        }
        if(user.is_verified == false){
            return res.status(403).json({ 'massege': 'Please verify your email before login' });
        }
        
      }else{
        return res.status(403).json({ 'massege': 'All fields are required' });
      }
      
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

module.exports = { loginSchema, validateRequestSchema };