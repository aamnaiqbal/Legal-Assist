const app= require('./app');
const mongoose= require('mongoose')


mongoose.connect("mongodb+srv://aamnaiqbal17:AnMgQ03YDUE3NTtv@legalassist.3cuqg.mongodb.net/?retryWrites=true&w=majority&appName=LegalAssist")
    .then(()=>{
        console.log("DB is connected successfully.")
    })
    .catch(()=>{
        console.log("Some error has occured in connecting to DB.")
    })

app.listen('3000', ()=>{
    console.log("Server has started.")
})