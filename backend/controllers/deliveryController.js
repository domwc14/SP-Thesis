
const Delivery = require('../models/deliveryModel')
const mongoose = require('mongoose')
const createDelivery = async (req,res) => {
    const {delivery_id,product_code,date,import_fee,quantity,remarks} = req.body
    try {
        const existingDelivery = await Delivery.findOne({delivery_id});
        if (existingDelivery) {
            // If a customer with the same name exists, return an error response
            return res.status(400).json({ error: "Delivery with the same number/id already exists." });
        }
        const delivery = await Delivery.create({delivery_id,product_code,date,import_fee,quantity,remarks})
        res.status(200).json(delivery)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const getAllDeliveries = async (req,res) => {
    const deliveries = await Delivery.find({}).sort({delivery_id: 1})
    res.status(200).json(deliveries)
}

const getSingleDelivery = async (req,res)=>{
    const {delivery_id} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const delivery = await Delivery.findOne({ delivery_id: delivery_id });
    if(!delivery){
        return res.status(404).json({error:'no delivery found by that number/id'})
    }
    res.status(200).json(delivery)
}

const deleteDelivery = async (req,res)=> {
    const {delivery_id} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const delivery = await Delivery.findOneAndDelete({ delivery_id: delivery_id });
    if(!delivery){
        return res.status(404).json({error:'no delivery found by that number/id'})
    }
    res.status(200).json(delivery)
}

const updateDelivery = async(req,res)=>{
    const {delivery_id} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    //instead of ...req.body, we change everything except delivery_id. 
    const delivery = await Delivery.findOneAndUpdate({
        delivery_id:delivery_id},{//...req.body
            product_code: req.body.product_code,
            date: req.body.date,
            import_fee: req.body.import_fee,
            quantity: req.body.quantity,
            remarks: req.body.remarks
    })

    if(!delivery){
        return res.status(404).json({error:'no delivery found by that number/id'})
    }
    res.status(200).json(delivery)
}


module.exports = {
    createDelivery,
    getSingleDelivery,
    getAllDeliveries,
    deleteDelivery, //eradicate them from their digital existence!
    updateDelivery
}
