const {UserTypes} = require('../db/models/User')
const db = require('../db/models')

const {SECRET_JWT} = require('../config')

exports.register = async (data, userType, res, next) =>{
    try {
        const {name, email, password, institute, ...social_links} = data

        const user = new db.User({
            name,
            email,
            password,
            userType: UserTypes[userType],
        });
        const token = user.generateToken(SECRET_JWT);
        
        if(UserTypes[userType] === 'student'){
            const student = new db.Student({
                user: user._id,
                institute,
                social_links
            })

            user['student'] = student._id           
            await student.save()
        }else{
            const mentor = new db.Mentor({
                user: user._id,
                institute,
                social_links
            })
            
            user['mentor'] = mentor._id
            await mentor.save()
        }

        await user.save()

        return res.status(201).send({
            token,
            user,
            message: 'Signup sucess. Please SignIn'
        })
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.login = async (req,res,next)=>{
    try {
        const user = await db.User.findByCredentials(req.body, next)

        if(!user) throw new Error('Check Your Credentials')

        const token = await user.generateToken(SECRET_JWT)

        return res.status(200).send({
            token,
            user
        })
    } catch (error) {
        next({
            status:401,
            message:error.message
        })        
    }
}

exports.getProfile = async (req, res, next) =>{
    try {
        const user = await db.User.findById(req.user._id)

        if(!user) throw new Error('No user found')

        const {
            password,
            ...userNeeded
        } = user._doc

        return res.status(200).json(userNeeded)
        
    } catch (error) {
        next({
            status:400,
            message:error.message
        })
    }
}

exports.followUser = async(req, res, next)=>{
    try {
        if(!req.params.followeeID || ( (req.params.followeeID).toString() === (req.user._id).toString() )) 
            throw new Error('Not a valid request')

        const follower = await db.User.findById(req.user._id)
        if(!follower) throw new Error('User not exists')

        const followee = await db.User.findById(req.params.followeeID)
        if(!followee) throw new Error('Followee not exists')

        const checkAlreadyFollowing = await db.User.findOne({_id: req.user._id, following: {$in : [followee._id]}})
        if(checkAlreadyFollowing) throw new Error('Already following the user')
        
        const user = await db.User.findByIdAndUpdate(req.user._id, {
            $push :{following: followee._id}
        },{new: true, upsert: true})

        await db.User.findByIdAndUpdate(followee._id, {
            $push :{followers: follower._id}
        })

        return res.status(201).send(user)
    } catch (error) {
        next({
            status: 400,
            message: error.message
        })
    }
}

exports.unfollowUser = async(req, res, next) =>{
    try {
        if(!req.params.followeeID || ( (req.params.followeeID).toString() === (req.user._id).toString() )) 
            throw new Error('Not a valid request')

        const follower = await db.User.findById(req.user._id)
        if(!follower) throw new Error('User not exists')

        const followee = await db.User.findById(req.params.followeeID)
        if(!followee) throw new Error('Followee not exists')

        const checkAlreadyFollowing = await db.User.findOne({_id: req.user._id, following: {$in : [followee._id]}})
        if(!checkAlreadyFollowing) throw new Error('Cannot unfollow a user, if not following one')

        const user = await db.User.findByIdAndUpdate(req.user._id, {
            $pull :{following: followee._id}
        },{new: true, upsert: true})

        await db.User.findByIdAndUpdate(followee._id, {
            $pull :{followers: follower._id}
        })

        return res.status(201).send(user)

    } catch (error) {
        next({
            status: 400,
            message: error.message
        })
    }
}

exports.getMentorFollowers = async(req, res, next)=>{
    try {
        const user = await db.User.findById(req.params.userID)
        if(!user) throw new Error('user not exists')

        if(user.userType !== 'mentor') throw new Error('Only mentor have followers')

        await user.populate({
            path: 'followers',
            populate:{
                path: 'student',
                select: ['social_links'],
            },
            transform: follower => {return {
                name: follower.name,
                userType: follower.userType,
                links: follower.student.social_links
            }}
        })

        return res.status(200).send(user.followers)
    } catch (error) {
        next({
            status: 400,
            message: error.message
        })
    }
}

exports.getStudentFollowing = async(req, res, next)=>{
    try {
        const user = await db.User.findById(req.params.userID)
        if(!user) throw new Error('user not exists')

        if(user.userType !== 'student') throw new Error('Only student can follow')

        await user.populate({
            path: 'following',
            populate:{
                path: 'mentor',
                select: ['social_links'],
            },
            transform: follower => {return {
                name: follower.name,
                userType: follower.userType,
                links: follower.mentor.social_links
            }}
        })

        return res.status(200).send(user.following)
    } catch (error) {
        next({
            status: 400,
            message: error.message
        })
    }
}

exports.updateProfile = async(req, res, next)=>{
    try {
        const user = await db.User.findById(req.user._id)
        if(!user) throw new Error('User not exists')

        const {name="", email="", institute="", ...social_links} = req.body

        if(user.userType === UserTypes.mentor){
            const mentor = await db.Mentor.findOne({user: user._id})
            if(!mentor) throw new Error(`${user.userType} not exists`)

            await db.Mentor.findByIdAndUpdate(mentor._id,{
                institute,
                'social_links':{
                    ...social_links
                }
            })
        }
        else if(user.userType === UserTypes.student){
            const student = await db.Student.findOne({user: user._id})
            if(!student) throw new Error(`${user.userType} not exists`)

            await db.Student.findByIdAndUpdate(student._id,{
                institute,
                'social_links':{
                    ...social_links
                }
            })
        }

        const newUser = await db.User.findByIdAndUpdate(user._id,{
            name,
        },{new: true, upsert: true})

        return res.status(201).send(newUser);
        
    } catch (error) {
        next({
            status: 400,
            message: error.message
        })
    }
}