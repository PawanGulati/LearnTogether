const router = require('express').Router()

const control = require('../controllers')
const auth =  require('../middlewares/auth')

const {runValidation} = require('../validators')
const {registerValidator, signInValidator} = require('../validators/user-validators')

// registers student
router.post(
    '/register-student',
    registerValidator,
    runValidation,
    (req,res,next)=>{
        control.register(req.body,'student',res,next)
    }
)

// registers mentor
router.post(
    '/register-mentor',
    registerValidator,
    runValidation,
    (req,res,next)=>{
        control.register(req.body,'mentor',res,next)
    }
)

// login
router.post(
    '/login',
    signInValidator,
    runValidation,
    control.login
)

// profile route
router.get('/user/me', auth, control.getProfile)

router.post('/user/follow/:followeeID', auth, control.followUser)

module.exports = router