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

        return res.status(201).send(demand)
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
        let queryTopics = []

        if(typeof topic === "string")
            queryTopics.push(topic)
        else if(topic === undefined)
            queryTopics = []
        else
            queryTopics = [...topic]

        let demands

        demands = await db.Demand.find({})
            .populate({path: 'topics', select: 'name', transform: topic => topic.name})
        
        if(!demands) throw new Error('Demand not exists')
        
        if(queryTopics.length > 0)
            demands = demands.filter(d => {
                if((d['topics'].length > 0) && (queryTopics.some(topic => d['topics'].includes(topic.toLowerCase()))))
                    return d
            })

        return res.status(200).send(demands)
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
            
        if(!student) throw new Error('Student not exists')

        return res.status(200).send(student.demands)
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

        return res.status(200).send(demand)
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

        return res.status(200).send(demand)
    } catch (error) {
        next({
            status: 401,
            message: error.message
        })
    }
}