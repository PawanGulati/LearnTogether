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
        const mentor = await db.Mentor
            .findOne({'user': req.user._id})

        if(!mentor) throw new Error('mentor not exists')

        return res.status(200).send(mentor)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}