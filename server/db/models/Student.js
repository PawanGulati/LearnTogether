const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    institutionName:{
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
    mentorsFollowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }],
    studentsFollowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    follwers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
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