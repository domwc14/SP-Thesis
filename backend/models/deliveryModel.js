const mongoose = require('mongoose')

const Schema = mongoose.Schema

const deliverySchema = new Schema ({
    delivery_id: {
        type: String,
        required: true
    },
    product_code: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true   
    },
    import_fee: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true
    },
    remarks:{
        type: String
    }
})

module.exports = mongoose.model('Delivery',deliverySchema)
//1st argument == collectionname
//

//because you can have different suppliers of same product. 
//For this model, each delivery document is a delivery of 1 product. Stored this way to note of Import Fee which may vary. 
//Taking note of import fee in important for filling taxes.