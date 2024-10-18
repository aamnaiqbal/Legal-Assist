const mongoose = require('mongoose')
const User=require('../Models/userModel');
const asyncErrorHandler= require('../utils/asyncErrorHandler');
const customError = require('../utils/customError');

exports.signup= asyncErrorHandler(async(req,res,next)=>{
    const user= await User.create(req.body);
    res.status(201).json({
        status: "success",
        data:{
            user
        }
    })
})

exports.login= asyncErrorHandler(async(req,res,next)=>{
    const {email, password}= req.body;
    if(!email || !password){
        return next(new customError("Please enter email and password for login.", 400));
    }
    const user= User.findOne({email: email}).select('+password')
    if(!user || !comparePasswordInDB(password, user.password) ){
        return next(new customError("Incorrect email or password.", 400));
    }
    res.status(200).json({
        status: "success",
        
    })
})