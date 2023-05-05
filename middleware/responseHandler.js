// Error handling Middleware function for logging the error message
const errorLogger = (error, request, response, next) => {
    next(error) // calling next middleware
}

// Error handling Middleware function reads the error message 
// and sends back a response in JSON format
const errorResponder = (err, request, response, next) => {
    console.log(err.stack)
    response.status(500).json({
        message: "Internal Server Error"
    });

}


module.exports = {
    errorLogger,
    errorResponder   
}