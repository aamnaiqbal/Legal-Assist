const mongoose=require('mongoose');
const validator= require('validator')

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
            message:"Name must ocntain only letters and spaces."
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
        }
    }
});

const User=mongoose.model('User', userSchema);
module.exports= User;