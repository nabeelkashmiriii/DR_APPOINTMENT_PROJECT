const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../Config/emailConfig');


class UserController {
    static userRegistration = async (req, res) => {
        const { fname, lname, email, password, confPassword } = req.body;
        const findEmail = await userModel.findOne({ email: email });
        if (!findEmail) {
            try {

                // Send OTP Email to user
                const OTP = Math.floor(Math.random() * 9000 + 1000);
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: "Email Confirmation",
                    html: `<fieldset>
                    <legend>OTP:</legend>
                    <strong style="background-color:powderblue;">${OTP}</strong>
                    </fieldset>`
                });
                // console.log(info);

                const salt = await bcrypt.genSalt(15);
                const hashPass = await bcrypt.hash(password, salt)

                const userData = userModel({
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: hashPass,
                    is_verified: false,
                    OTP: OTP,
                })
                await userData.save();
                res.status(201).send({ "code": 201, "status": "success", "message": "user has been registered Please verify your OTP" })
            } catch (error) {
                console.log(error);
                res.status(403).send({ "status": "failed", "message": "unable to register" })
            }


        } else {
            res.status(409).send({ "code": 409, "status": "failed", "message": "email already exists" })
        }
    }

    // verify OTP
    static verifyOTP = async (req, res) => {
        const OTP = req.body;
        const update = { is_verified: true };
        await userModel.findOneAndUpdate(OTP, update);
        res.status(200).send({ "code": 200, "status": "success", "message": "Email has been verified" });


    }

    // LogIn 
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const comparePass = await bcrypt.compare(password, user.password);
            if ((user.email === email) && comparePass) {
                // Generate JWT
                const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' })
                res.status(201).send({ "code": 201, "status": "success", "message": "Login Successfully", "token": jwtToken })
            } else {
                res.status(401).send({ "code": 401, "status": "failed", "message": "Credentials are wrong" })
            }



        } catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "Login Failed" });
        }
    }
}


module.exports = UserController;