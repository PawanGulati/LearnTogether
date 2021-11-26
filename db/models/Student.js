const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    institute:{
        type: String,
        trim: true,
        lowercase: true,
        default: ''
    },
    social_links:{
        linkedin: {
            type:String, 
            default: ''
        },
        facebook: {
            type:String, 
            default: ''
        },
        codechef: {
            type:String, 
            default: ''
        },
        codeforces: {
            type:String, 
            default: ''
        },
        leetcode: {
            type:String, 
            default: ''
        },
        github: {
            type:String, 
            default: ''
        },
        twitter: {
            type:String, 
            default: ''
        }
    },
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

studentSchema.virtual('demands', {
    ref: 'Demand',
    localField: '_id',
    foreignField: 'student'
})

module.exports = mongoose.model('Student', studentSchema);