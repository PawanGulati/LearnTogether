const router = require('express').Router()

const control = require('../controllers')
const auth = require('../middlewares/auth')

router.route('/')
    .get(control.getAllDemands)
    .post(auth, control.createDemand)

router.route('/me')
    .get(auth, control.getMyDemands)

router.route('/:demandID')
    .get(control.getDemand)
    .delete(auth, control.deleteDemand)

module.exports = router