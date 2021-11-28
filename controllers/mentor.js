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

        await mentor.populate({
            path: 'user',
            select:['following', 'followers']
        })

        return res.status(200).send({
            ...mentor._doc, 
            followers: mentor.user.followers.length,
            following: mentor.user.following.length
        })
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.updateMentor = async(req, res, next)=>{
    
}