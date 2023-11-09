const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//

const createWorkout = async (req,res) => {
    const {title,load,reps} = req.body
    let emptyFields = []
    if (!title){
        emptyFields.push('title')
    }
    if (!load){
        emptyFields.push('load')
    }
    if (!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in fields highlighted in red ',emptyFields})
    }

    try {
        const existingWorkout = await Workout.findOne({ title });
        if (existingWorkout) {
            // If a workout with the same title exists, return an error response
            return res.status(400).json({ error: "Workout with the same title already exists." });
        }
        const user_id = req.user._id //(for #17 assigning)
        const workout = await Workout.create({title,load,reps,user_id})
        //const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const getWorkouts = async (req,res) => {
    //const user_id = req.user_id #17
    //const workouts = await Workout.find({user_id}).sort({createdAt:-1})
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

const getSingleWorkout = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'invalid ID'})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:'no workout found by that id'})
    }
    res.status(200).json(workout)
}

const deleteWorkout = async (req,res)=> {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'invalid ID'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error:'no workout found by that id'})
    }
    res.status(200).json(workout)
}

const updateWorkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'invalid ID'})
    }
    const workout = await Workout.findOneAndUpdate({
        _id:id},{...req.body
    })

    if(!workout){
        return res.status(404).json({error:'no workout found by that id'})
    }
    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}