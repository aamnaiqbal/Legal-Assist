const mongoose= require('mongoose');
const validator = require('validator');

const adminSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"],
        trim: true

    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please enter your email. It is required field"],
        validate: [validate.isEmail, "Please enter valid email"],
        lowercase: true,
        
    },
    password:{
        type: String,
        required:[true, "Please enter your password"],
        minlength: [8,"Password must be minimum of 8 characters."]
    },
    confirmPassword:{
        type: String,
        required:[true, "Please confirm your password"],
        validate:{
            validator: function(val){
                return val===this.password
            },
            message: "Password and confirm password must match."
        }
    },
    cnicNo:{

    },
    
});

const Admin= mongoose.Model('Admin', 'adminSchema')