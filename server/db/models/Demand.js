const mongoose = require('mongoose')

const demandSchema = new mongoose.Schema({
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }]
})

module.exports = new mongoose.model('Demand', demandSchema)