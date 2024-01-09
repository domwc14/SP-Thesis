const mongoose = require('mongoose')

const Schema = mongoose.Schema

const monthlyInventorySchema = new Schema ({
    date: {
        type: Date,
        required: true
    },
    inventory_value: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('monthlyInventory',monthlyInventorySchema)