const path = require('path')

if(process.env.NODE_ENV === 'developement')
    require('dotenv').config({
        path: path.join(__dirname, '..', '.env')
    })

if(process.env.NODE_ENV === 'test')
    require('dotenv').config({
        path: path.join(__dirname, '..', '.env.test')
    })

module.exports = {
    PORT:process.env.PORT,
    DB:process.env.MONGO_URL,
    BACKEND_URL:process.env.BACKEND_URL,
    SECRET_JWT:process.env.SECRET_KEY_JWT,
    CLIENT_URL:process.env.CLIENT_URL,
}