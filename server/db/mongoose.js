const mongoose = require('mongoose')

const {DB} = require('../config')

mongoose.set('debug', false)
mongoose.Promise = global.Promise;

const options = {
    autoIndex: true
}

// create the database connection

const connectDB = async()=>{
    try {
        await mongoose.connect(DB, options)
    } catch (err) {
        console.log('Mongoose connection error');
        console.log(err);
    }
}

connectDB().then(console.log('Mongoose connecion done')).catch(err=>console.log(err))