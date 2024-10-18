const mongoose=require('mongoose');
const validator= require('validator')
const bcrypt= require('bcrypt')

const userSchema= new mongoose.Schema({
    role: {
        type: String,
        default: "user"
    },
    name:{
        type: String,
        required: [true, "Please enter your name."],
        validate:{
            validator: function(val){
                return /^[a-zA-Z\s]+$/.test(val)
            },
            message:"Name must contain only letters and spaces."
        }
    },
    email:{
        type: String,
        required: [true, "Please enter your email. It is required field"],
        unique: true,
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
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password, 12) //12 is the cost factor
    this.confirmPassword= undefined;
    next();
});

userSchema.methods.comparePasswordInDB= async function(password, passwordDB){
    return await bcrypt.compare(password, passwordDB)
}

const User=mongoose.model('User', userSchema);
module.exports= User;