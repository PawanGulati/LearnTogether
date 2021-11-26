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
},{timestamps: true})

eventSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'event'
})

eventSchema.set('toObject', { virtuals: true });
eventSchema.set('toJSON', { virtuals: true });

module.exports = new mongoose.model('Event', eventSchema)