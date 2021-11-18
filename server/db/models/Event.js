const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    demand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Demand'
    },
    scheduleOn:{
        type: Date,
        default: Date.now
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        default: null
    }
})

module.exports = new mongoose.model('Event', eventSchema)