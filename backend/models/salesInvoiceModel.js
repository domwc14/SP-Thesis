const mongoose = require('mongoose')

const Schema = mongoose.Schema

const salesInvoiceSchema = new Schema ({
    invoice_number: {
        type: String,
        required: true
    },
    reference_PO: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true   
    },
    description: {
        type: String,
    },
    total_amount: {
        type: Number,
        required: true
    },
    payment_terms: {
        type: String
    },
    payment_due: {
        type: Date,
        required: true   
    },
    date_paid: {
        type: Date
    },
    amount_paid:{
        type: Number,
        required: true
    },
    BIR_2307: {
        type: Number,
        required: true   
    },
    SR: {
        type: String,
        required: true
    },
    CR_Number:{
        type: String,
        required: true
    },
    purchase_list: [
        {
          product_code: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
})

module.exports = mongoose.model('Sales Invoice',salesInvoiceSchema)
//1st argument == collectionname