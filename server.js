const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const errorControl = require('./controllers')
const routes = require('./routes')

// db connection
require('./db/mongoose')

// cors
app.use(cors())

// parsers
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// routes
app.use('/api/auth',routes.auth)
app.use('/api/demand',routes.demands)
app.use('/api/event', routes.event)
app.use('/api/mentor', routes.mentor)
app.use('/api/student', routes.student)
app.use('/api/room', routes.room)

// production static files
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

// error handlers
app.use(errorControl.notFound)
app.use(errorControl.errors)

module.exports = app