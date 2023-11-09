const express = require('express')

//import OR require. YOU CAN ONLY USE ONE for the whole program
const {
    createWorkout,
    getSingleWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

//this is a check for auth. first.
router.use(requireAuth)

router.get('/', getWorkouts)    

router.get('/:id', getSingleWorkout)

router.post('/',createWorkout)

router.delete('/:id',deleteWorkout)

router.patch('/:id',updateWorkout)

module.exports = router