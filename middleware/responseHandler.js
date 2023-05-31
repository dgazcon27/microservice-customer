// Error handling Middleware function for logging the error message
const errorLogger = (error, request, response, next) => {
    
    next(error) // calling next middleware
}

// Error handling Middleware function reads the error message 
// and sends back a response in JSON format
const errorResponder = (err, request, response, next) => {
    let message = process.env.DEBUG ? err.message : "Internal Server Error" 
    let status = 500
    if (err.details !== undefined) {
        message = err.details
        status = 400
    }
        
    response.status(status).json({
        message: message
    });
    
}


module.exports = {
    errorLogger,
    errorResponder   
}