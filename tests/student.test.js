const request = require('supertest')
const mongoose = require('mongoose')


const app = require('../server')
const { setupDataBase, userOne} = require('./fixtures/db')
const { expect } = require('@jest/globals')


describe('Students routes', ()=>{
    beforeEach(setupDataBase)

    afterAll(async ()=>{
        await mongoose.disconnect()
    })

    test('Should get profile for student', async()=>{
        await request(app)
            .get('/api/student/me')
            .set('authorization', `Bearer ${userOne.token}`)
            .send()
            .expect(200)
    })

    test('Should not get profile for unauthenticated student', async()=>{
        await request(app)
            .get('/api/student/me')
            .send()
            .expect(401)
    })
})