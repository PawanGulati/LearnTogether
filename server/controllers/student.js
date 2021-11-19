const db = require('../db/models')

exports.getStudent = async (req, res, next)=>{
    try {
        const student = await db.Student.findOne({'user': req.user._id})

        if(!student) throw new Error('student not exists')

        return res.send(student).status(200)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}