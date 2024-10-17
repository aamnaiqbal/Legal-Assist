const express= require('express');
const app= express();

const adminRouter= require('./Routes/adminRoute');
const userRouter= require('./Routes/userRoute');

app.use(express.json())

//Using Route


module.exports= app;