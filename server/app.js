const express= require('express');
const app= express();

const globalErrorHandler=require('./Controllers/errorController');

const lawyerRouter= require('./Routes/lawyerRoute');
const userRouter= require('./Routes/userRoute');

app.use(express.json())

//Using Route
app.use('/api/v1/admin', lawyerRouter)

//global error handler
app.use(globalErrorHandler)
module.exports= app;