const express = require('express')
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory instead of the filesystem for deployment

//import OR require. YOU CAN ONLY USE ONE for the whole program

const {
    getDueSalesInvoices
} = require('../controllers/salesinvoiceController.js')

const { 
    sendEmail
} = require ('../controllers/sendemailController.js')

const router = express.Router()

router.get('/',getDueSalesInvoices)
// router.post('/sendemail',sendEmail)

//local storage does not work in heroku app.
// const upload = multer({dest: './public/data/uploads/' });
const upload = multer({ storage: storage });

router.post('/sendemail', upload.single('attachment'), sendEmail);

// router.post('/sendemail', upload.single('attachment'), sendEmail);


module.exports = router