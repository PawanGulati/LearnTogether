const router = require('express').Router()

const control = require('../controllers')
const auth = require('../middlewares/auth')

router.route('/')
    .get(control.getMentors)

router.route('/me')
    .get(auth, control.getMentor)

module.exports = router