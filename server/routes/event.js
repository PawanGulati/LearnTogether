const router = require('express').Router()

const control = require('../controllers')
const auth = require('../middlewares/auth')


router.route('/')
    .get(auth, control.getAllEvents)
    .post(auth, control.createEvent)


// router.post('/join/:eventID', auth, control.joinEvent)

router.route('/me')
    .get(auth, control.getMyRegisteredEvents)

router.post('/demand/:demandID', auth, control.createEventFromDemand)

router.post('/book/:eventID', auth, control.createEventBooking)

router.post('/join/:eventID', auth, control.joinEvent)

router.get('/book', auth, control.getMyBookings)

// router.get('/inprogress', control.getEventsInProgress)

module.exports = router