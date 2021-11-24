const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    institute:{
        type: String,
        trim: true
    },
    social_links:{
        linkedin: String,
        facebook: String,
        codechef: String,
        codeforces: String,
        leetcode: String,
        github: String,
        twitter: String
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