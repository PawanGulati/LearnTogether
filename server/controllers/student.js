const db = require('../db/models')

exports.getStudent = async (req, res, next)=>{
    try {
        const student = await db.Student
            .findOne({'user': req.user._id})
            .select('-registeredEvents')

        if(!student) throw new Error('student not exists')

        await student.populate({
            path: 'user',
            select:['following', 'followers']
        })

        return res.status(200).send({
            ...student._doc, 
            followers: student.user.followers.length, 
            following: student.user.following.length
        })
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}