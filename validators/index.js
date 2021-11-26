const {validationResult} = require('express-validator')

// Finds the validation errors in this request and wraps them in an object with handy functions
exports.runValidation = (req,res,next) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return next({
            status:422,
            message:errors.array()[0].msg 
        })
    }

    next()
}