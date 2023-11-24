const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema ({
    product_code: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true   
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    acquisition_price: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true   
    },
    unit: {
        type: String
    },
    stocktrigger_at: {
        type: Number
    },

})

module.exports = mongoose.model('Product',productSchema)
//1st argument == collectionname

//stocktrigger_at: notifies if stock level is lower than this
//also notifies at 0