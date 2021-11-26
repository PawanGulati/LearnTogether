const {check} = require('express-validator')
const db = require('../db/models')

//This validator will throw an Error as array of objects if there is any 
exports.registerValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name field required')
        .custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                db.User.findOne({name:req.body.name}, function(err, user){
                if(err) {
                    reject(new Error('Server Error'))
                }
                if(Boolean(user)) {
                    reject(new Error('UserName already in use'))
                }
                resolve(true)
                })
            })
        }),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email field required')
        .isEmail()
        .withMessage('Not a valid mail')
        .custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                db.User.findOne({email:req.body.email}, function(err, user){
                if(err) {
                    reject(new Error('Server Error'))
                }
                if(Boolean(user)) {
                    reject(new Error('E-mail already in use'))
                }
                resolve(true)
                })
            })
        }),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password field required')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
        .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit '),
]

exports.signInValidator = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email field required')
        .isEmail()
        .withMessage('Not a valid mail'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password field required'),
]