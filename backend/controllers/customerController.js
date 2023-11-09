

const Customer = require('../models/customerModel')
const mongoose = require('mongoose')
const createCustomer = async (req,res) => {
    const {name,customer_type,location,market} = req.body
    try {
        const existingCustomer = await Customer.findOne({ name });
        if (existingCustomer) {
            // If a customer with the same name exists, return an error response
            return res.status(400).json({ error: "Customer with the same name already exists." });
        }
        const customer = await Customer.create({name,customer_type,location,market})
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
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const customer = await Customer.findOne({ name: name });
    if(!customer){
        return res.status(404).json({error:'no customer found by that name'})
    }
    res.status(200).json(customer)
}

const deleteCustomer = async (req,res)=> {
    const {name} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const customer = await Customer.findOneAndDelete({ name: name });
    if(!customer){
        return res.status(404).json({error:'no customer found by that name'})
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
    const customer = await Customer.findOneAndUpdate({
        name:name},{//...req.body
            customer_type : req.body.customer_type,
            location: req.body.location,
            market: req.body.market
    })

    if(!customer){
        return res.status(404).json({error:'no customer found by that name'})
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