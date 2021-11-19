const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }]
})

eventSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'event'
})

module.exports = new mongoose.model('Event', eventSchema)