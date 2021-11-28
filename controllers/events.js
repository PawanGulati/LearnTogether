const mongoose = require('mongoose')
const {nanoid} = require('nanoid')

const db = require('../db/models')

exports.createEventFromDemand = async (req, res, next) =>{
    try {
        const demand = await db.Demand.findById(req.params.demandID)

        if(!demand) throw new Error('Demand not exists')
        
        const student = await db.Student.findOne({user: req.user._id})
        if(demand['student'].toString() === student._id.toString()) throw new Error('Cannot create event of your own demand')
        
        const event = new db.Event()
        
        event['topics'] = [...demand.topics]
        event['students'] = [student._id, demand.student]

        await event.save()

        demand.topics.forEach(async topic => {
            await db.Topic.findByIdAndUpdate(topic, {
                $push: {'events': event._id},
                $pull: {'demands': demand._id}
            },{upsert: true})
        })

        await db.Student.findByIdAndUpdate(student._id, {
            $push: {'registeredEvents': event._id}
        },{upsert: true})

        await db.Student.findByIdAndUpdate(demand.student, {
            $push: {'registeredEvents': event._id}
        },{upsert: true})

        await demand.remove()

        return res.status(201).send(event)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.createEventBooking = async (req, res, next)=>{
    try {
        if(new Date(req.body.date) < new Date()) throw new Error('Event can only be created in future')

        const mentor = await db.Mentor.findOne({'user': req.user._id})

        if(!mentor) throw new Error('Mentor not exists')
        
        const event = await db.Event.findById(req.params.eventID)
        if(!event) throw new Error('Event not exists')

        const booking = new db.Booking({
            'scheduleOn': req.body.date,
            'mentor': mentor._id,
            'event': event._id
        })

        await booking.save()

        await (new db.Room({name: nanoid(8), booking: booking._id, admin: mentor._id})).save()

        return res.status(201).send(booking)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.createEvent = async (req, res, next)=>{
    try {
        if(new Date(req.body.date) < new Date()) throw new Error('Event can only be created in future')

        const mentor = await db.Mentor.findOne({'user': req.user._id})

        if(!mentor) throw new Error('Mentor not exists')

        const event = new db.Event()
        await event.save()

        const booking = new db.Booking({
            'scheduleOn': req.body.date,
            'mentor': mentor._id,
            'event': event._id
        })

        const {topics} = req.body

        await topics.forEach(async topic => {
            const check = await db.Topic.findOne({"name": topic})

            if(check){
                await db.Topic.findByIdAndUpdate(check._id,
                    { "$push": { "events": event._id } }
                )

                await db.Event.findByIdAndUpdate(event._id,
                    { "$push": { "topics": check._id } }
                )
            }else{
                const newTopic = new db.Topic({"name": topic, "events": [event._id]})
                await newTopic.save()
            
                await db.Event.findByIdAndUpdate(event._id,
                    { "$push": { "topics": newTopic._id } }
                )
            }
        })

        await booking.save()

        await (new db.Room({name: nanoid(8), booking: booking._id, admin: mentor._id})).save()

        return res.status(201).send(event)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.joinEvent = async(req, res, next)=>{
    try {
        const student = await db.Student.findOne({'user':req.user._id})
        if(!student) throw new Error('Student not exists')

        let event = await db.Event.findById(req.params.eventID)
        if(!event) throw new Event('Event not exists')

        const check = await db.Student.findOne({_id:student._id, 'registeredEvents': event._id})

        if(check) throw new Error('Already a member')

        event = await db.Event.findByIdAndUpdate(event._id, {
            $push: {'students': student._id}
        },{upsert: true, new: true})

        await db.Student.findByIdAndUpdate(student._id, {
            '$push': {'registeredEvents': event._id}
        })

        return res.status(201).send(event)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getMyBookings = async(req, res, next)=>{
    try {
        const mentor = await db.Mentor.findOne({'user': req.user._id})

        if(!mentor) throw new Error('Mentor not exists')

        await mentor.populate({
            path: 'bookings',
            populate: {
                path: 'event',
                populate: {
                    path: 'topics',
                    select: 'name',
                    transform: topics => topics.name
                },
                select: ['students', 'topics']
            },
            select: ['scheduleOn', 'event']
        })

        return res.status(200).send(mentor.bookings)

    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getAllEvents = async (req, res, next)=>{
    try {
        const {topic, inprogress, registered} = req.query
        let queryTopics = []

        if(typeof topic === "string")
            queryTopics.push(topic)
        else if(topic === undefined)
            queryTopics = []
        else
            queryTopics = [...topic]

        let events

        events = await db.Event.find({})
        .populate({path: 'topics', select: 'name', transform: topic => topic.name})
        .populate({
            path: 'bookings',
            populate: {
                path: 'mentor',
                populate: {
                    path: 'user',
                    select: 'name'
                },
                transform: mentor => mentor.user.name,
            },
            select: ['mentor', 'scheduleOn']
        })
        
        if(!events) throw new Error('Something went wrong')
        
        if(queryTopics.length > 0)
            events = events.filter(e => {
                if((e['topics'].length > 0) && (queryTopics.some(topic => e['topics'].includes(topic.toLowerCase()))))
                    return e
            })

        if(inprogress === 'true'){
            events = events.filter(e => {if(e.bookings.length==0) return e})
            return res.send(events).status(200)
        }

        else if(registered === 'true')
            events = events.filter(e => {if(e.bookings.length > 0) return e})

        return res.status(200).send(events)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getMyRegisteredEvents = async (req, res, next) =>{
    try {
        const student = await db.Student.findOne({'user': req.user._id})
        
        if(!student) throw new Error('Student not exists')

        await student.populate({
            path: 'registeredEvents',
            populate: [{path: 'topics', select: 'name', transform: topic => topic.name},
            {
                path: 'bookings',
                populate: {
                    path: 'mentor',
                    populate: {
                        path: 'user',
                        select: 'name'
                    },
                    transform: mentor => mentor.user.name,
                },
                select: ['mentor', 'scheduleOn']
            }]
        })

        return res.status(200).send(student['registeredEvents'])

    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getSuggestedBookings = async(req, res, next)=>{
    try {
        const user = await db.User.findById(req.user._id)
        if(!user) throw new Error('User not exists')

        await user.populate({
            path: 'following',
            populate: {
                path: 'mentor',
                populate:{
                    path: 'bookings',
                    populate: {
                        path: 'event',
                        populate: [{
                            path: 'topics',
                            select: 'name',
                            transform: topics => topics.name
                        },
                        {
                            path: 'bookings',
                            populate: {
                                path: 'mentor',
                                populate: {
                                    path: 'user',
                                    select: 'name'
                                },
                                transform: mentor => mentor.user.name,
                            },
                            select: ['mentor', 'scheduleOn']
                        }]
                    },
                    select: ['event'],
                    transform: booking => booking.event
                },
                select: ['bookings'],
                transform: mentor => mentor.bookings
            },
            select: ['mentor'],
            transform: following => following.mentor
        })

        const resultant = user.following.reduce((acc, val)=>{acc = [...acc, ...val]; return acc;}, [])

        return res.status(200).send(resultant)
    } catch (error) {
        next({
            status: 400,
            message: error.message
        })
    }
}