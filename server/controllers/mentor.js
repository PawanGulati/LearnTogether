const db = require('../db/models')

exports.getMentors = async (req, res, next) =>{
    try {
        const mentors = await db.Mentor.find().populate('user')

        return res.send(mentors).status(200)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getMentor = async (req, res, next)=>{
    try {
        const mentor = await db.Mentor.findById(req.params.mentorID).populate('user')

        return res.send(mentor).status(200)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}