const mongoose = require('mongoose')
const User=require('../Models/userModel');
const asyncErrorHandler= require('../utils/asyncErrorHandler')

exports.signup= asyncErrorHandler(async(req,res,next)=>{
    const user= await User.create(req.body);
    res.status(201).json({
        status: "success",
        data:{
            user
        }
    })
})