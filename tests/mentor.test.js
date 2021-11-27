const request = require('supertest')
const mongoose = require('mongoose')


const app = require('../server')
const { setupDataBase, userThree} = require('./fixtures/db')
const { expect } = require('@jest/globals')


describe('Mentor routes', ()=>{
    beforeEach(setupDataBase)

    afterAll(async ()=>{
        await mongoose.disconnect()
    })

    test('Should get profile for mentor', async()=>{
        await request(app)
            .get('/api/mentor/me')
            .set('authorization', `Bearer ${userThree.token}`)
            .send()
            .expect(200)
    })

    test('Should not get profile for unauthenticated mentor', async()=>{
        await request(app)
            .get('/api/mentor/me')
            .send()
            .expect(401)
    })

    test('Should get list of mentors if authorized', async()=>{
        await request(app)
            .get('/api/mentor')
            .set('authorization', `Bearer ${userThree.token}`)
            .send()
            .expect(200)
    })

    test('Should not get list of mentors if unauthorized', async()=>{
        await request(app)
            .get('/api/mentor')
            .send()
            .expect(401)
    })
})