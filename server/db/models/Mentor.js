const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
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
    }
})

mentorSchema.virtual('bookings',{
    ref: 'Booking',
    localField: '_id',
    foreignField: 'mentor'
})

mentorSchema.set('toObject', { virtuals: true });
mentorSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Mentor', mentorSchema);