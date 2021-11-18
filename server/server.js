const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const errorControl = require('./controllers')
const routes = require('./routes')

// db connection
require('./db/mongoose')

// cors
app.use(cors())

// parsers
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// routes
app.use('/api/auth',routes.auth)

app.delete('/', async (req, res, next)=>{
    try {
        const db = mongoose.connection.db
        const collections = await db.listCollections().toArray()

        collections.map(coll => coll.name).forEach(async c => await db.dropCollection(c))

        res.status(200)
        return next()
    } catch (error) {
        next({
            status: 400,
            error: error.message
        })
    }
})

// error handlers
app.use(errorControl.notFound)
app.use(errorControl.errors)

module.exports = app