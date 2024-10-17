const mongoose=require('mongoose');
const valiator= require('validator')

const userSchema= new mongoose.Schema({

});

const User=mongoose.model('User', userSchema);
module.exports= User;