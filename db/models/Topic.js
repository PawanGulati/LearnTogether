const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    demands:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Demand'
    }],
    events:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
})

module.exports = mongoose.model('Topic', topicSchema);