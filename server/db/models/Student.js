const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    institute:{
        type: String,
        trim: true,
        lowercase: true
    },
    social_links:{
        linkedin: String,
        facebook: String,
        codechef: String,
        codeforces: String,
        leetcode: String,
        github: String,
        twitter: String
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