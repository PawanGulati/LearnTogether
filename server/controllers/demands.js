const db = require('../db/models')

exports.createDemand = async (req, res, next) =>{
    try {
        const student = await db.Student.findOne({'user': req.user._id})

        if(!student) throw new Error('Student not exists')

        const demand = new db.Demand({"student": student._id});        
        await demand.save()

        const {topics} = req.body

        await topics.forEach(async topic => {
            const check = await db.Topic.findOne({"name": topic})

            if(check){
                await db.Topic.findByIdAndUpdate(check._id,
                    { "$push": { "demands": demand._id } }
                )

                await db.Demand.findByIdAndUpdate(demand._id,
                    { "$push": { "topics": check._id } }
                )
            }else{
                const newTopic = new db.Topic({"name": topic, "demands": [demand._id]})
                await newTopic.save()
            
                await db.Demand.findByIdAndUpdate(demand._id,
                    { "$push": { "topics": newTopic._id } }
                )
            }
        })

        return res.send(demand).status(201)
    } catch (error) {
        next({
            status: 401,
            message: error.message    
        })
    }
}

exports.getAllDemands = async (req, res, next)=>{
    try {
        const {topic} = req.query
        let topics = []

        if(typeof topic === "string")
            topics.push(topic)
        else if(topic === undefined)
            topics = []
        else
            topics = [...topic]

        let demands

        if(topics.length === 0)
            demands = await db.Demand.find({}).populate({path: 'topics', select: 'name'})
        else
            demands = await db.Demand
                .find({})
                .populate({
                    path: "topics", 
                    match: {name: {$in : topics}}, //TODO: OTHER TOPICS NOT SHOWING
                    select: 'name'
                })
        
        if(!demands) throw new Error('Something went wrong')
        
        demands = demands.filter(d => d.topics.length > 0)

        return res.send(demands).status(200)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getMyDemands = async (req, res, next)=>{
    try {
        const student = await db.Student.findOne({'user': req.user._id}).populate({
            path: 'demands',
            model: 'Demand',
            populate: {
                path: 'topics',
                model: 'Topic',
                transform: topic => topic.name
            }
        })
            
        if(!student) throw new Error('Not Authenticated')

        return res.send(student.demands).status(200)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.getDemand = async (req, res, next)=>{
    try {
        const demand = await db.Demand
            .findById(req.params.demandID)
            .populate({
                path: 'topics',
                select: 'name',
                transform: topic => topic.name
            })

        if(!demand) throw new Error('Demand not found')

        return res.send(demand).status(200)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}

exports.deleteDemand = async (req, res, next)=>{
    try {
        const student = await db.Student.findOne({'user': req.user._id})
        if(!student) throw new Error('Student not exists')

        const demand = await db.Demand.findOneAndDelete({
            'student': student._id,
            '_id': req.params.demandID
        })
        
        if(!demand) throw new Error('Not autherized to delete')

        demand['topics'].forEach(async topic => {
            try {
                await db.Topic.findByIdAndUpdate(topic, {
                    $pull: {'demands': demand._id}    
                },{upsert: true})
            } catch (error) {
                throw new Error(error.message)
            }
        })

        return res.send(demand).status(200)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}