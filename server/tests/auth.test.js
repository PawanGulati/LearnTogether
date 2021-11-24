const request = require('supertest')

const app = require('../server')
const db = require('../db/models')
const { setupDataBase, userOne} = require('./fixtures/db')
const { expect } = require('@jest/globals')
const auth = require('../middlewares/auth')


describe('Auth routes', ()=>{
    beforeEach(setupDataBase)

    test('Should signup a new student', async()=>{
        const response = await request(app)
            .post('/api/auth/register-student')
            .send({
                name: 'Pawan',
                email: 'pawan@gmail.com',
                password: 'Pass@123'
            })
            .expect(201)
        
        // assert that the db was changed
        const user = await db.User.findById(response.body.user._id)
        expect(user).not.toBeNull()
    
        expect(response.body).toMatchObject({
            user:{
                name: 'Pawan',
                email: 'pawan@gmail.com',
                userType: 'student'
            }
        })

        expect(user.password).not.toBe('Pass@1234')
    })
    
    test('Should not signup student with invalid name/email/password', async()=>{
        const response = await request(app)
            .post('/api/auth/register-student')
            .send({
                name: userOne.name,
                email: 'pawan@gmail.com',
                password: 'Pass@123'
            })
            .expect(422)
    })
    
    test('Should signup a new mentor', async()=>{
        const response = await request(app)
            .post('/api/auth/register-mentor')
            .send({
                name: 'Pawan',
                email: 'pawan@gmail.com',
                password: 'Pass@123'
            })
            .expect(201)
        
        // assert that the db was changed
        const user = await db.User.findById(response.body.user._id)
        expect(user).not.toBeNull()
    
        expect(response.body).toMatchObject({
            user:{
                name: 'Pawan',
                email: 'pawan@gmail.com',
                userType: 'mentor'
            }
        })

        expect(user.password).not.toBe('Pass@1234')
    })
    
    test('Should login existing user', async()=>{
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: userOne.email,
                password: userOne.password
            })
            .expect(200)
    })
    
    test('Should not login non existing user', async()=>{
        await request(app)
            .post('/api/auth/login')
            .send({
                email: 'pawan@gmail.com',
                password: 'Pass@1234'
            })
            .expect(400)
    })
})
