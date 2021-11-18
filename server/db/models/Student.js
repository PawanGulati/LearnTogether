const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    institutionName:{
        type: String,
        trim: true
    },
    mentorsFollowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }],
    stdsFollowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    follwers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    demands: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Demand'
    }],
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

module.exports = mongoose.model('Student', studentSchema);