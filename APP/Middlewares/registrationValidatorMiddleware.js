
const { body, validationResult } = require('express-validator');

const registrationSchema = [

    body('fname').isAlpha().withMessage('must be letters only'),
    body('lname').isAlpha().withMessage('must be letters only'),
    body('email').isEmail().withMessage({
        message: 'Not an email',
        errorCode: 403,
      }),
    body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    body('confPassword').isLength({ min: 5 }).withMessage('must be at least 5 chars long')
]
const validateRequestSchema = async (req, res, next) => {

    const errors = validationResult(req);
    if (req.body.password !== req.body.confPassword) {
        return res.status(403).json({ 'massege': 'Password confirmation does not match password' });
      }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}


module.exports = { registrationSchema, validateRequestSchema };