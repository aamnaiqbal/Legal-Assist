const mongoose= require('mongoose');
const validator = require('validator');
const bcrypt= require('bcrypt')

const lawyerSchema= new mongoose.Schema({
    role: {
        type: String,
        default: "lawyer"
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
        },
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

lawyerSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password, 12) //12 is the cost factor
    this.confirmPassword= undefined;
    next();
})

lawyerSchema.methods.comparePasswordInDB= async function(password,passwordDB){
    return await bcrypt.compare(password, passwordDB)
}

const Lawyer= mongoose.model('Lawyer', lawyerSchema);

module.exports= Lawyer;