const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, '..', `.env${process.env.NODE_ENV === 'test' ? '.test': ''}`)
})

module.exports = {
    PORT:process.env.PORT,
    DB:process.env.MONGO_URL,
    BACKEND_URL:process.env.BACKEND_URL,
    SECRET_JWT:process.env.SECRET_KEY_JWT,
    CLIENT_URL:process.env.CLIENT_URL,
}