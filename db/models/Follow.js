const mongoose = require('mongoose')

const followRelationship = Object.freeze({
    studentFollowMentor: 'sfm',
    studentFollowStudent: 'sfs'
})

const followSchema = new mongoose.Schema({
    followeeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})