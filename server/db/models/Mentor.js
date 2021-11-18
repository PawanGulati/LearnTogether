const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    institutionName:{
        type: String,
        trim: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    scheduledEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

module.exports = mongoose.model('Mentor', mentorSchema);