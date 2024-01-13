const express = require('express')
//import OR require. YOU CAN ONLY USE ONE for the whole program

const {
    createSalesInvoice,
    getSingleSalesInvoice,
    getAllSalesInvoices,
    deleteSalesInvoice, //eradicate them from their digital existence!
    updateSalesInvoice,
    getTotalAmountSalesInvoices,
    getAccountsReceivableSalesInvoices,
    getYearlySalesInvoices
} = require('../controllers/salesinvoiceController.js')
const router = express.Router()

router.get('/',getAllSalesInvoices)
router.post('/add', createSalesInvoice)
router.post('/getTotal',getTotalAmountSalesInvoices)
router.get('/getReceivables',getAccountsReceivableSalesInvoices)
router.post('/getYearTotal',getYearlySalesInvoices)
router.get('/:invoice_number', getSingleSalesInvoice)
router.delete('/:invoice_number',deleteSalesInvoice)
router.patch('/:invoice_number',updateSalesInvoice)

module.exports = router