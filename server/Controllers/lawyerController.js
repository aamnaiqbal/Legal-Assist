const mongoose = require('mongoose')
const Lawyer= require('../Models/lawyerModel')
const customError= require('../utils/customError')
const asyncErrorHandler= require('../utils/asyncErrorHandler')

exports.signup= asyncErrorHandler(async(req,res,next)=>{
    const lawyer= await Lawyer.create(req.body);
    res.status(201).json({
        status: "success",
        data:{
            lawyer
        }
    })
});

exports.login= asyncErrorHandler(async(req,res,next)=>{
    const {email,password}= req.body;
    //check if the request contains email and password
    if(!email || !password){
        const err= new customError("Please provide email and password for login.",400);
        return next(err);
    }
    //find lawyer with the given email
    const lawyer= await Lawyer.findOne({email: email}).select('+password');
    if(!lawyer || !await Lawyer.comparePasswordInDB(password, user.password)){
        return next(new customError("Incorrect email or password.", 400));
    }
    res.status(200).json({
        status: "success",
        data:{
            lawyer
        }
    })
})