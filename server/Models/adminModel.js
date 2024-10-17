const mongoose= require('mongoose');
const validator = require('validator');

const adminSchema= new mongoose.Schema({
    role: {
        type: String,
        default: "admin"
    },
    name:{
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        validate: {
            validator: function(val){
                return /^[a-zA-Z\s]+$/.test(val)
            },
            message: "Name must contain only letters and spaces."
        }
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please enter your email. It is required field"],
        validate: [validator.isEmail, "Please enter valid email"],
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
        type: Number,
        required: [true, "CNIC No. is a required field."],
        unique: true,
        validate: {
            validator:function(val){
                return val.toString().length===13
            }, 
            message: "CNIC must contain exactly 13 digits without any dashes"
        }
    },
    licenseNo:{
        type: Number,
        required: [true, "License No. is a required field."],
        unique: true,
        validate: {
            validator:function(val){
                return val.toString().length===10
            }, 
            message: "License number must contain exactly 10 digits."
        }
    },
    legalExpertise:{
        type: String,
        enum: ["Property Law", "Family Law", "Criminal Law"],
        required: [true, "The legal expertise must be selected."]
    },
    profileImg:{
        type: String,
    }
    
});

const Admin= mongoose.Model('Admin', adminSchema)