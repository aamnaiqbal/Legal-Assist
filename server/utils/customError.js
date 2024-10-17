class customError extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode=statusCode; 
        this.status= statusCode>=400 && statusCode<=499? 'fail': "error";
        this.isOperational= true;
        this.captureStackTrace(this, this.constructor)
    }

}

module.exports= customError;