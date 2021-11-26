const router = require('express').Router()

const control = require('../controllers')
const auth = require('../middlewares/auth')

router.get('', auth, control.getMyRooms)

module.exports = router