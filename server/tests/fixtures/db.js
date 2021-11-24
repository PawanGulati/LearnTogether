const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {SECRET_JWT} = require('../../config')
const db = require('../../db/models')

// all IDs
const userOneID = new mongoose.Types.ObjectId()
const userTwoID = new mongoose.Types.ObjectId()
const userThreeID = new mongoose.Types.ObjectId()
const userFourID = new mongoose.Types.ObjectId()
const stdOneID = new mongoose.Types.ObjectId()
const stdTwoID = new mongoose.Types.ObjectId()
const stdThreeID = new mongoose.Types.ObjectId()
const mentorOneID = new mongoose.Types.ObjectId()
const mentorTwoID = new mongoose.Types.ObjectId()
const topicID = new mongoose.Types.ObjectId()
const demandID = new mongoose.Types.ObjectId()
const eventOneID = new mongoose.Types.ObjectId()
const eventTwoID = new mongoose.Types.ObjectId()
const bookingID = new mongoose.Types.ObjectId()


// 3 users -> 2 students and 1 mentors
const userOne = {
    _id: userOneID,
    token: jwt.sign({_id: userOneID}, SECRET_JWT),
    name: 'student1',
    email: 'std1@gmail.com',
    password: 'Pass@1234',
    userType: 'student'
}

const stdOne = {
    _id: stdOneID,
    user: userOneID,
    institute: 'nit goa',
    registeredEvents: [eventOneID, eventTwoID]
}

const userTwo = {
    _id: userTwoID,
    token: jwt.sign({_id: userTwoID}, SECRET_JWT),
    name: 'student2',
    email: 'std2@gmail.com',
    password: 'Pass@1234',
    userType: 'student'
}
const stdTwo = {
    _id: stdTwoID,
    user: userTwoID,
    institute: 'nit goa',
    registeredEvents: [eventOneID, eventTwoID]
}

const userThree = {
    _id: userThreeID,
    token: jwt.sign({_id: userThreeID}, SECRET_JWT),
    name: 'mentor1',
    email: 'men1@gmail.com',
    password: 'Pass@1234',
    userType: 'mentor'
}

const mentorOne = {
    _id: mentorOneID,
    user: userThreeID,
    institute: 'nit goa'
}

const userFour = {
    _id: userFourID,
    token: jwt.sign({_id: userFourID}, SECRET_JWT),
    name: 'student3',
    email: 'std3@gmail.com',
    password: 'Pass@1234',
    userType: 'student'
}

const stdThree = {
    _id: stdThreeID,
    user: userFourID,
    institute: 'nit goa',
    registeredEvents: []
}

// 1 topic
const topic = {
    _id: topicID,
    name: 'topic 1',
    demands: [demandID],
    events: [eventOneID, eventTwoID]
}

// 1 demand
const demand = {
    _id: demandID,
    student: stdOneID,
    topics: [topicID]
}

// 2 event
const eventOne = {
    _id: eventOneID,
    students: [stdOneID, stdTwoID],
    topics: [topicID]
}

const eventTwo = {
    _id: eventTwoID,
    students: [stdOneID, stdTwoID],
    topics: [topicID]
}

// 1 booking
const booking = {
    _id: bookingID,
    scheduleOn: new Date(),
    mentor: mentorOneID,
    event: eventTwoID
}

const setupDataBase = async ()=>{
    await db.User.deleteMany()
    await db.Topic.deleteMany()
    await db.Student.deleteMany()
    await db.Mentor.deleteMany()
    await db.Event.deleteMany()
    await db.Demand.deleteMany()
    await db.Booking.deleteMany()

    await new db.User(userOne).save()
    await new db.Student(stdOne).save()
    await new db.User(userTwo).save()
    await new db.Student(stdTwo).save()
    await new db.User(userThree).save()
    await new db.Mentor(mentorOne).save()
    await new db.User(userFour).save()
    await new db.Student(stdThree).save()
    await new db.Topic(topic).save()
    await new db.Demand(demand).save()
    await new db.Event(eventOne).save()
    await new db.Event(eventTwo).save()
    await new db.Booking(booking).save()
}

module.exports = {
    userOne,
    userTwo,
    userThree,
    userFour,
    stdOne,
    stdTwo,
    stdThree,
    mentorOne,
    topic,
    demand,
    eventOne,
    eventTwo,
    booking,
    setupDataBase
}