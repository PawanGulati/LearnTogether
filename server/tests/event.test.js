const request = require('supertest')

const app = require('../server')
const db = require('../db/models')
const { setupDataBase, userOne, stdOne, eventOne, eventTwo, userThree, demand, stdTwo, userTwo, mentorOne, userFour, stdThree} = require('./fixtures/db')
const { expect } = require('@jest/globals')


describe('Event routes', ()=>{
    beforeEach(setupDataBase)

    test('Should get list of events for authorized user', async()=>{
        const response = await request(app)
            .get('/api/event')
            .set('authorization', `Bearer ${userThree.token}`)
            .send()
            .expect(200)

        expect(Array.isArray(response.body)).toBeTruthy()
    })

    test('Should not get list of events for unauthorized user', async()=>{
        await request(app)
            .get('/api/event')
            .send()
            .expect(401)
    })

    test('Should create event for user', async()=>{
        const response = await request(app)
            .post('/api/event')
            .set('authorization', `Bearer ${userThree.token}`)
            .send({
                topics: ['topic1'],
                date: '11/27/2021'
            })
            .expect(201)
        
        const event = await db.Event.findById(response.body._id)
        expect(event).not.toBeNull()

        expect(response.body).toMatchObject({
            _id: event._id
        })
    })

    test('Should get list of authorized student registered events', async()=>{
        const response = await request(app)
            .get('/api/event/me')
            .set('authorization', `Bearer ${userOne.token}`)
            .send()
            .expect(200)

        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(2)

        expect(response.body[0]).toMatchObject({
            _id: eventOne._id
        })
    })

    test('Should get list of authorized mentor scheduled events', async()=>{
        const response = await request(app)
            .get('/api/event/book')
            .set('authorization', `Bearer ${userThree.token}`)
            .send()
            .expect(200)

        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)

        expect(response.body[0]).toMatchObject({
            _id: eventTwo._id
        })
    })

    test('Should create an Event from given demand ID', async()=>{
        const response = await request(app)
            .post(`/api/event/demand/${demand._id}`)
            .set('authorization', `Bearer ${userTwo.token}`)
            .send()
            .expect(201)

        const demandDeleted = await db.Demand.findById(demand._id)
        expect(demandDeleted).toBeFalsy()

        const event = await db.Event.findById(response.body._id)
        expect(event).not.toBeNull()

        const checkInRegEvent = await db.Student.findOne({user: userTwo._id, registeredEvents: {$in : [response.body._id]}})
        expect(checkInRegEvent).not.toBeNull()

        const checkStdInEvent = await db.Event.findOne({_id: event._id, students: {$in : [stdTwo._id]}})
        expect(checkStdInEvent).not.toBeNull()
        
    })

    test('Should book an event from given Event ID', async()=>{
        const response = await request(app)
            .post(`/api/event/book/${eventOne._id}`)
            .set('authorization', `Bearer ${userThree.token}`)
            .send({
                'date': '12/21/2022'
            })
            .expect(201)

        const booking = await db.Booking.findById(response.body._id)
        expect(booking).not.toBeNull()

        const check = await db.Booking.findOne({mentor: mentorOne._id, event: eventOne._id})
        expect(check).not.toBeNull()

    })

    test('authorized student should be able to join an event', async()=>{
        const response = await request(app)
            .post(`/api/event/join/${eventOne._id}`)
            .set('authorization', `Bearer ${userFour.token}`)
            .send()
            .expect(201)
        
        const checkStdInEvent = await db.Event.findOne({_id: response.body._id, students:{$in : [stdThree._id]}})
        expect(checkStdInEvent).not.toBeNull()

        const checkEventInStd = await db.Student.findOne({_id: stdThree._id, registeredEvents: {$in : [response.body._id]}})
        expect(checkEventInStd).not.toBeNull()

    })
})