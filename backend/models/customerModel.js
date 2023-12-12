//CUSTOMER NEEDS TO HAVE TIN (string of nums)
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    customer_type: {
        type: String,
        required: true   
    },
    location: {
        type: String,
        required: true
    },
    market: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Customer',customerSchema)
//1st argument == collectionname
//