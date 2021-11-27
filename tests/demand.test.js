const request = require('supertest')
const mongoose = require('mongoose')


const app = require('../server')
const db = require('../db/models')
const { setupDataBase, userOne, stdOne, demand} = require('./fixtures/db')
const { expect } = require('@jest/globals')


describe('Demand routes', ()=>{
    beforeEach(setupDataBase)

    afterAll(async ()=>{
        await mongoose.disconnect()
    })

    test('Should get list of demands for authorized user', async()=>{
        const response = await request(app)
            .get('/api/demand')
            .set('authorization', `Bearer ${userOne.token}`)
            .send()
            .expect(200)

        expect(Array.isArray(response.body)).toBeTruthy()
    })

    test('Should not get list of demands for unauthorized user', async()=>{
        await request(app)
            .get('/api/demand')
            .send()
            .expect(401)
    })

    test('Should create demand for user', async()=>{
        const response = await request(app)
            .post('/api/demand')
            .set('authorization', `Bearer ${userOne.token}`)
            .send({
                topics: ['topic1']
            })
            .expect(201)
        
        const demand = await db.Demand.findById(response.body._id)
        expect(demand).not.toBeNull()

        expect(response.body).toMatchObject({
            _id: userOne._id,
            student: stdOne._id
        })
    })

    test('Should get list of authorized user demands', async()=>{
        const response = await request(app)
            .get('/api/demand/me')
            .set('authorization', `Bearer ${userOne.token}`)
            .send()
            .expect(200)

        expect(Array.isArray(response.body)).toBeTruthy()

        expect(response.body.length).toEqual(1) 
        expect(response.body[0]).toMatchObject({
            _id: demand._id,
            student: stdOne._id
        })
    })

    test('Should get the demand from demand ID', async()=>{
        const response = await request(app)
            .get(`/api/demand/${demand._id}`)
            .set('authorization', `Bearer ${userOne.token}`)
            .send()
            .expect(200)

        expect(response.body).toMatchObject({
            _id: demand._id,
            student: stdOne._id
        })
    })

    // test('Should delete a demand from given demand ID', async()=>{
    //     await request(app)
    //         .delete(`api/demand/${demand._id}`)
    //         .set('authorization', `Bearer ${userOne.token}`)
    //         .send()
    //         .expect(204)
        
    //     expect(await db.Demand.findById(demand._id)).toBeFalsy()
    // })

    // test('Should not delete other uder demand', async()=>{

    // })
})