const {UserTypes} = require('../db/models/User')
const db = require('../db/models')

const {SECRET_JWT} = require('../config')

exports.register = async (data, userType, res, next) =>{
    try {
        const {name, email, password, institute, ...social_links} = data

        const user = new db.User({
            name,
            email,
            password,
            userType: UserTypes[userType],
        });
        const token = user.generateToken(SECRET_JWT);

        await user.save()

        if(UserTypes[userType] === 'student'){
            const student = new db.Student({
                user: user._id,
                institute,
                social_links
            })
    
            await student.save()
        }else{
            const mentor = new db.Mentor({
                user: user._id,
                institute,
                social_links
            })
    
            await mentor.save()
        }

        return res.status(201).send({
            token,
            user,
            message: 'Signup sucess. Please SignIn'
        })
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.login = async (req,res,next)=>{
    try {
        const user = await db.User.findByCredentials(req.body, next)

        if(!user) throw new Error('Check Your Credentials')

        const token = await user.generateToken(SECRET_JWT)

        return res.status(200).send({
            token,
            user
        })
    } catch (error) {
        next({
            status:401,
            message:error.message
        })        
    }
}

exports.getProfile = async (req, res, next) =>{
    try {
        const user = await db.User.findById(req.user._id)

        if(!user) throw new Error('No user found')

        const {
            password,
            ...userNeeded
        } = user._doc

        return res.status(200).json(userNeeded)
        
    } catch (error) {
        next({
            status:400,
            message:error.message
        })
    }
}