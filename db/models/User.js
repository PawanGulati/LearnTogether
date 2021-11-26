const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// different user types
const UserTypes = Object.freeze({
    mentor:'mentor',
    student:'student'
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true
    },
    password: String,
    userType: {
        type: String,
        default: UserTypes.student,
        enum: {
            values: Object.values(UserTypes),
            message: 'Not valid user type'
        }
    },
    mentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{timestamps: true})

// data abstraction
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

// Hash password before save
userSchema.pre('save', async function (next) {
    try {
        const user = this
        if (!user.isModified('password')) {
            return next()
        }
        const hashed = await bcrypt.hash(user.password, 10)
        user.password = hashed

        return next()
    } catch (err) {
        return next({ status: 400, message: err.message })
    }
})

// Schema Methods >> 
// Generating token when LOGIN n REGISTER
userSchema.methods.generateToken = function (secret) {
    try {
        const user = this
        const {
            _id,
            name,
        } = user

        let payload = {
            _id,
            name
        }
        const token = jwt.sign(payload, secret, {
            algorithm: 'HS512',
            expiresIn: 3600 * 24 //1 DAY
        })

        return token
    
    } catch (err) {
        return next(Error('No token generated'))
    }
}

// Schema Static var and methods >>
Object.assign(userSchema.statics, UserTypes)

// Used when SIGN IN check credentials
userSchema.statics.findByCredentials = async function ({email,password},next){
    try{
        const user = await User.findOne({email})        

        if(!user){
            throw new Error('No user exists')
        }

        const isValid = await bcrypt.compare(password,user.password)
        
        if(!isValid){
            throw new Error('Password\'s incorrect')
        }

        return user
    }catch(err){
        return next({ status: 400, message: err.message })
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User
module.exports.UserTypes = UserTypes