const router = require('express').Router()

const control = require('../controllers')
const auth = require('../middlewares/auth')


router.route('/')
    .get(control.getAllEvents)
    .post(auth, control.createEvent)


// router.post('/join/:eventID', auth, control.joinEvent)

router.route('/me')
    .get(auth, control.getMyEvents)

router.post('/demand/:demandID', auth, control.createEventFromDemand)

router.post('/book/:eventID', auth, control.createEventBooking)

router.post('/join/:eventID', auth, control.joinEvent)

router.get('/book', auth, control.getMyBookings)

module.exports = router