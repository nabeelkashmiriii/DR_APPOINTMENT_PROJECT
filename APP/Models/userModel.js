const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname:{type:String, required:true, trim:true},
    lname:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    password:{type:String, required:true, trim:true},
    is_verified:{type:Boolean, default:false},
    OTP:{type:Number, required:true}
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;