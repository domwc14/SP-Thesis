const express = require('express')

//import OR require. YOU CAN ONLY USE ONE for the whole program
const {
    createCustomer,
    getSingleCustomer,
    getAllCustomers,
    deleteCustomer, //eradicate them from their digital existence!
    updateCustomer
} = require('../controllers/customerController')
const router = express.Router()

router.get('/',getAllCustomers)
router.post('/addcustomer', createCustomer)
router.get('/:name', getSingleCustomer)
router.delete('/:name',deleteCustomer)
router.patch('/:name',updateCustomer)

module.exports = router