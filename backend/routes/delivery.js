const express = require('express')

//import OR require. YOU CAN ONLY USE ONE for the whole program
const {
    createDelivery,
    getSingleDelivery,
    getAllDeliveries,
    deleteDelivery, //eradicate them from their digital existence!
    updateDelivery
} = require('../controllers/deliveryController')
const router = express.Router()

router.get('/',getAllDeliveries)
router.post('/adddelivery', createDelivery)
router.get('/:delivery_id', getSingleDelivery)
router.delete('/:delivery_id',deleteDelivery)
router.patch('/:delivery_id',updateDelivery)

module.exports = router