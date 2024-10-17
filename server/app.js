const express= require('express');
const app= express();

const globalErrorHandler=require('./Controllers/errorController');

const adminRouter= require('./Routes/adminRoute');
const userRouter= require('./Routes/userRoute');

app.use(express.json())

//Using Route
app.use('/api/v1/admin', adminRouter)

//global error handler
app.use(globalErrorHandler)
module.exports= app;