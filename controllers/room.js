const db = require('../db/models')
const {UserTypes} = require('../db/models/User')

exports.getMyRooms = async(req, res, next)=>{
    try {
        const user = await db.User.findById(req.user._id)
        if(!user) throw new Error('User not Exists')

        let rooms = []

        // if(user['userType'] === UserTypes.student){
        //     await user
        //         .populate({
        //             path: 'student',
        //             populate:{
        //                 path:'registeredEvents',
        //                 populate: 'bookings',
        //                 // select: 'bookings'
        //             },
        //             select:'registeredEvents'
        //         })
        
        //     rooms = user.student.registeredEvents.filter(events => events.bookings.length > 0)
        // }
        // else if(user['userType'] === UserTypes.mentor){
        //     await user
        //         .populate({
        //             path: 'mentor',
        //             populate:{
        //                 path:'bookings',
        //                 populate:'event',
        //                 select: 'event',
        //                 transform: booking=>booking.event
        //             }
        //         })
        
        //     rooms = user.mentor.bookings
        // }
        if(user['userType'] === UserTypes.mentor){
            rooms = await db.Room.find({})
                .populate({
                    path: 'admin',
                    populate:{
                        path: 'user',
                        '_id': {$eq: user._id}
                    }
                })
        }

        return res.status(200).send(rooms)
    } catch (error) {
        next({
            status: 400,
            message: error.message
        })
    }
}

exports.getRoom = async(req, res, next)=>{
    try {


        const room = await db.Room.findById(req.params.roomID)

        return res.status(200).send(rooms)
    } catch (error) {
        next({
            status: 400,
            message: error.message
        })
    }
}