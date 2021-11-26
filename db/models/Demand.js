const mongoose = require('mongoose')

const demandSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }]
},{timestamps: true})

// demandSchema.virtual('topics', {
//     ref: 'Topic',
//     localField: '_id',
//     foreignField: 'demands'
// })

module.exports = mongoose.model('Demand', demandSchema)