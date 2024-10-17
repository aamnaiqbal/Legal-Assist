const mongoose = require('mongoose')
const Lawyer= require('../Models/lawyerModel')
const asyncErrorHandler= require('../utils/asyncErrorHandler')

exports.signup= asyncErrorHandler(async(req,res,next)=>{
    const lawyer= await Lawyer.create(req.body);
    res.status(201).json({
        status: "success",
        data:{
            lawyer
        }
    })
})