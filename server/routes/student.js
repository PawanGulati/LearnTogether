const router = require('express').Router()

const auth = require('../middlewares/auth')
const control = require('../controllers')

router.get('/me', auth, control.getStudent)

module.exports = router