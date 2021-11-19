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
    }]
})

mentorSchema.virtual('bookings',{
    ref: 'Booking',
    localField: '_id',
    foreignField: 'mentor'
})

module.exports = mongoose.model('Mentor', mentorSchema);