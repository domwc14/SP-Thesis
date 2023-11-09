const Product = require('../models/productModel')
const mongoose = require('mongoose')
const createProduct = async (req,res) => {
    const {product_code, type , size , color ,description, acquisition_price, unit_price, unit} = req.body
    try {
        const existingProduct = await Product.findOne({product_code});
        if (existingProduct) {
            // If a customer with the same name exists, return an error response
            return res.status(400).json({ error: "Product with the same product_code already exists." });
        }
        const product = await Product.create({product_code, type , size , color ,description, acquisition_price, unit_price, unit})
        res.status(200).json(product)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const getAllProducts = async (req,res) => {
    const products = await Product.find({}).sort({product_code: 1})
    res.status(200).json(products)
}

const getSingleProduct = async (req,res)=>{
    const {product_code} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const product = await Product.findOne({ product_code: product_code });
    if(!product){
        return res.status(404).json({error:'no product found by that product code'})
    }
    res.status(200).json(product)
}

const deleteProduct = async (req,res)=> {
    const {product_code} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const product = await Product.findOneAndDelete({ product_code: product_code });
    if(!product){
        return res.status(404).json({error:'no product found by that number/id'})
    }
    res.status(200).json(product)
}

const updateProduct = async(req,res)=>{
    const {product_code} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    //instead of ...req.body, we change everything except delivery_id. 
    //we can still use req.body basta walang changing ng product_code sa body naten
    const product = await Product.findOneAndUpdate({
        product_code:product_code},{...req.body
    })

    if(!product){
        return res.status(404).json({error:'no product found by that number/id'})
    }
    res.status(200).json(product)
}


module.exports = {
    createProduct,
    getSingleProduct,
    getAllProducts,
    deleteProduct, //eradicate them from their digital existence!
    updateProduct
}