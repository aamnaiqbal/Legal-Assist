const mongoose = require('mongoose')
const Admin= require('../Models/adminModel')
const asyncErrorHandler= require('../utils/asyncErrorHandler')

exports.signup= asyncErrorHandler(async(req,res,next)=>{
    const admin= await Admin.create(req.body);
    res.status(201).json({
        status: "success",
        data:{
            admin
        }
    })
})