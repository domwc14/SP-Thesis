const express = require('express')
//import OR require. YOU CAN ONLY USE ONE for the whole program

const {
    getDueSalesInvoices
} = require('../controllers/salesinvoiceController.js')
const router = express.Router()

router.get('/',getDueSalesInvoices)


module.exports = router