const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema ({
    product_code: {
        type: String,
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
    }
})

module.exports = mongoose.model('Product',productSchema)
//1st argument == collectionname