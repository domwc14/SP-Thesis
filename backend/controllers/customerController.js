

const Customer = require('../models/customerModel')
const SalesInvoice = require('../models/salesInvoiceModel')
const mongoose = require('mongoose')

const createCustomer = async (req,res) => {
    const {name,TIN,customer_type,location,market} = req.body
    let emptyFields = []
    if (!name){
        emptyFields.push('name')
    }
    if (!TIN){
        emptyFields.push('TIN')
    }
    if (!customer_type){
        emptyFields.push('customer_type')
    }
    if (!location){
        emptyFields.push('location')
    }
    if (!market){
        emptyFields.push('market')
    }
   
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in fields highlighted in red ',emptyFields})
    }
    
    try {
        const existingCustomer = await Customer.findOne({ name });
        if (existingCustomer) {
            // If a customer with the same name exists, return an error response
            return res.status(400).json({ error: "Customer with the same name already exists.",emptyFields });
        }
        const customer = await Customer.create({name,TIN,customer_type,location,market})
        res.status(200).json(customer)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const getAllCustomers = async (req,res) => {
    const customers = await Customer.find({}).sort({name: 1})
    res.status(200).json(customers)
}

const getSingleCustomer = async (req,res)=>{
    const {name} = req.params
    let emptyFields = []
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const customer = await Customer.findOne({ name: name });
    if(!customer){
        emptyFields.push('customer_name')
        return res.status(404).json({error:'no customer found by that name',emptyFields})
    }
    res.status(200).json(customer)
}

const deleteCustomer = async (req,res)=> {
    const {name} = req.params

    let emptyFields = []    //just so we can make the box turn red, but correct error message is still returned @ if !product
    if (!name){
        emptyFields.push('name')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in fields highlighted in red ',emptyFields})
    }
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }

    // const existingSalesInvoice = await SalesInvoice.find({ 'customer.name': name }).populate('customer'); DOESNT WORK
    const Allsalesinvoices = await SalesInvoice.find({})
    .populate('customer')
    .sort({ invoice_number: 1 });

    const existingSalesInvoice = Allsalesinvoices.find(invoice => invoice.customer.name === name);

    if(existingSalesInvoice){
        emptyFields.push('name')
        return res.status(404).json({error:'This customer has a sales invoice in the system. They cannot be deleted.',emptyFields})
    }
    res.status(200).json()
    const customer = await Customer.findOneAndDelete({ name: name });
    if(!customer){
        return res.status(404).json({error:'no customer found by that name',emptyFields})
    }
    res.status(200).json(customer)
}

//optional to fix: customer can be renamed to another existing customer
const updateCustomer = async(req,res)=>{
    const {name} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    //update everything except name

    let emptyFields = []    //just so we can make the box turn red, but correct error message is still returned @ if !product
    if (!name){
        emptyFields.push('name')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in fields highlighted in red ',emptyFields})
    }

    const customer = await Customer.findOneAndUpdate({
        name:name},{//...req.body
            TIN: req.body.TIN,
            customer_type : req.body.customer_type,
            location: req.body.location,
            market: req.body.market
    })

    if(!customer){
        return res.status(404).json({error:'no customer found by that name',emptyFields})
    }
    res.status(200).json(customer)
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getSingleCustomer,
    deleteCustomer,
    updateCustomer
}