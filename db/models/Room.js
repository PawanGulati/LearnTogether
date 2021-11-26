const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name:{
        type: String,
        default: 'room'
    },
    booking:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }
})

module.exports = mongoose.model('Room', roomSchema)