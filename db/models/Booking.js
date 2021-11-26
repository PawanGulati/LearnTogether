const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    scheduleOn:{
        type: Date,
        default: new Date
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
},{timestamps: true})

module.exports = mongoose.model('Booking', bookingSchema)