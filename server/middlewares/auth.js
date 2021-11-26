const jwt = require('jsonwebtoken')

const {SECRET_JWT} = require('../config')

module.exports = async (req,res,next) =>{
    try {
        if(req.headers['authorization']){
            const token = req.headers['authorization'].split(' ')[1]
            const user = await jwt.verify(token,SECRET_JWT)
            
            if(!user){ throw new Error('Account Verification Failed') }
            req.user = user

            return next()
        }else{
            throw new Error('Failed TO Authenticate!')
        }
    } catch (error) {
        next({
            status:401,
            message:'Failed To Authenticate!'
        })
    }
}