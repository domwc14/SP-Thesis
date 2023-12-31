const express = require('express')
//import OR require. YOU CAN ONLY USE ONE for the whole program

const {
    getAlerts,
    // patchTriggerto0, //temporary to patch the "stock trigger at" of all items  to 0
} = require('../controllers/alertsController.js')
const router = express.Router()

router.get('/',getAlerts)
// router.patch('/patchTriggerto0',patchTriggerto0)


module.exports = router