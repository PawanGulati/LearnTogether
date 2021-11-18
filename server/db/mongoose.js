const mongoose = require('mongoose')

const {DB} = require('../config')

mongoose.set('debug',true)
mongoose.Promise = global.Promise;

const options = {
    autoIndex: true
}

// create the database connection
mongoose
    .connect(DB, options)
    .then(()=>{
        console.log('Mongoose connecion done');
    })
    .catch(err =>{
        console.log('Mongoose connection error');
        console.log(err);
    })