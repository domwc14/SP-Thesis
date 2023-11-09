const SalesInvoice = require('../models/salesInvoiceModel')
const mongoose = require('mongoose')
const createSalesInvoice = async (req,res) => {
    const {invoice_number,reference_PO,date,description,
    total_amount,payment_terms,payment_due,date_paid,amount_paid,BIR_2307,SR,CR_Number,purchase_list
    } = req.body
    try {
        const existingSalesInvoice = await SalesInvoice.findOne({invoice_number});
        if (existingSalesInvoice) {
            // If a customer with the same name exists, return an error response
            return res.status(400).json({ error: "Sales Invoice with the same invoice number already exists." });
        }
        const salesinvoice = await SalesInvoice.create({invoice_number,reference_PO,date,description,
            total_amount,payment_terms,payment_due,date_paid,amount_paid,BIR_2307,SR,CR_Number,purchase_list
        })
        res.status(200).json(salesinvoice)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const getAllSalesInvoices = async (req,res) => {
    const salesinvoice = await SalesInvoice.find({}).sort({invoice_number: 1})
    res.status(200).json(salesinvoice)
}

const getSingleSalesInvoice = async (req,res)=>{
    const {invoice_number} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const salesinvoice = await SalesInvoice.findOne({ invoice_number: invoice_number });
    if(!salesinvoice){
        return res.status(404).json({error:'no sales invoice found by that invoice number'})
    }
    res.status(200).json(salesinvoice)
}

const deleteSalesInvoice = async (req,res)=> {
    const {invoice_number} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){SalesInvoice
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const salesinvoice = await SalesInvoice.findOneAndDelete({ invoice_number: invoice_number });
    if(!salesinvoice){
        return res.status(404).json({error:'no sales invoice found by that invoice number'})
    }
    res.status(200).json(salesinvoice)
}

const updateSalesInvoice = async(req,res)=>{
    const {invoice_number} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    //instead of ...req.body, we change everything except delivery_id. SalesInoi
    //we can still use req.body basta walang changing ng product_code sa body naten
    const salesinvoice = await SalesInvoice.findOneAndUpdate({
        invoice_number:invoice_number},{...req.body
    })

    if(!salesinvoice){
        return res.status(404).json({error:'no sales invoice found by that invoice number'})
    }
    res.status(200).json(salesinvoice)
}


module.exports = {
    createSalesInvoice,
    getSingleSalesInvoice,
    getAllSalesInvoices,
    deleteSalesInvoice, //eradicate them from their digital existence!
    updateSalesInvoice
}


//REQUESTS NOT YET TESTED