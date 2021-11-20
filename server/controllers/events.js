const mongoose = require('mongoose')

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

        return res.send(event).status(201)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.createEventBooking = async (req, res, next)=>{
    try {
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

        return res.send(booking).status(201)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.createEvent = async (req, res, next)=>{
    try {
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

        return res.send(booking).status(201)
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

        const event = await db.Event.findById(req.params.eventID)
        if(!event) throw new Event('Event not exists')

        const check = await db.Student.findOne({'registeredEvents': event._id})

        if(check) throw new Error('Already a member')

        event['students'] = [...event['students'], student._id]
        student['registeredEvents'] = [...student['registeredEvents'], event._id]

        await event.save()
        await student.save()

        return res.send(event).status(201)
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

        await mentor.populate('bookings')

        return res.send(mentor.bookings).status(200)

    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getAllEvents = async (req, res, next)=>{
    try {
        const {topic} = req.query
        let topics = []

        if(typeof topic === "string")
            topics.push(topic)
        else if(topic === undefined)
            topics = []
        else
            topics = [...topic]

        let events

        if(topics.length === 0)
            events = await db.Event.find({}).populate({path: 'topics', select: 'name'})
        else
            events = await db.Event
            .find({})
            .populate({
                path: "topics", 
                match: {name: {$in : topics}}, 
                select: 'name',
            })
        
        if(!events) throw new Error('Something went wrong')

        events = events.filter(d => d.topics.length > 0)

        return res.send(events).status(200)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getMyEvents = async (req, res, next) =>{
    try {
        const student = await db.Student.findOne({'user': req.user._id})
        
        if(!student) throw new Error('Student not exists')

        const events = await db.Event.find({
            student: {$in: student._id}
        }).populate({
            path: 'topics',
            model: 'Topic',
            transform: topic => topic.name
        }).populate({
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

        if(!events) throw new Error('Events not exists')

        return res.send(events).status(200)

    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}