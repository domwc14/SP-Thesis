
const SalesInvoice = require('../models/salesInvoiceModel')
const Product = require('../models/productModel')
const mongoose = require('mongoose')
const createSalesInvoice = async (req,res) => {
    const {invoice_number,reference_PO,customer,date,description,payment_terms,payment_due,date_paid,amount_paid,BIR_2307,SR,CR_Number,purchase_list
    }  = req.body
    let emptyFields = []
    if (!invoice_number){
        emptyFields.push('invoice_number')
    }
    if (!reference_PO){
        emptyFields.push('reference_PO')
    }
    if (!customer){
        emptyFields.push('customer_name')
    }
    if (!date){
        emptyFields.push('date')
    }
    // if (!description){
    //     emptyFields.push('description')
    // }
    // if (!total_amount){
    //     emptyFields.push('total_amount')
    // }
    // if (!payment_terms){
    //     emptyFields.push('payment_terms')
    // }
    if (!payment_due){
        emptyFields.push('payment_due')
    }
    // if (!date_paid){
    //     emptyFields.push('date_paid')
    // }
    if (!amount_paid){
        emptyFields.push('amount_paid')
    }
    if (!BIR_2307){
        emptyFields.push('BIR_2307')
    }
    if (!SR){
        emptyFields.push('SR')
    }
    if (!CR_Number){
        emptyFields.push('CR_Number')
    }
    if (!purchase_list || purchase_list.length == 0){
        emptyFields.push('product_code')
        return res.status(400).json({error: 'The customer has not bought anything. ',emptyFields})
    }

    // purchase_list.forEach((item) => {    //already checked in AddToCartChecker
    //     if (item.product_code === undefined || item.quantity === undefined || item.amount === undefined) {
    //         emptyFields.push('purchase_list')
    //         return res.status(400).json({error: 'The 3 fields are all required. One purchase lacks an entry.',emptyFields})
    //     }
    //   });

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in fields highlighted in red ',emptyFields})
    }
    let existingProduct
    let total_amount = 0
    for (const obj of purchase_list) {  //total_amount , check if product is real in inventory and if stock > quantity sa purchase list
        total_amount += parseFloat(obj.amount);
        try {
            existingProduct = await Product.findOne({ product_code: obj.product_code });
            if (!existingProduct) {
                // If a sales invoice with the same name exists, return an error response
                return res.status(400).json({ error: `The item ${obj.product_code} does not exist in inventory`,emptyFields });
            }
            if(obj.quantity > existingProduct.stock){
                return res.status(400).json({ error: `The item ${obj.product_code} does not have enough stock to fulfill the order`,emptyFields });
            }
        } catch (error){
            res.status(400).json({error: error.message,emptyFields})
        }
        // console.log(existingProduct)
        // Do something with existingProduct if needed
    }

    //for loop for actually updating inventory stock. separated because if suddenly one of them is error, some stock would hve been reduced
    for (const obj of purchase_list) {  //reduce stock by obj.quantity
        try {
            existingProduct = await Product.findOne({ product_code: obj.product_code });
            existingProduct.stock = existingProduct.stock - obj.quantity
            await existingProduct.save();

        } catch (error){
            res.status(400).json({error: error.message,emptyFields})
        }
        console.log(existingProduct)
    }

    // purchase_list.forEach(obj => {
    //     total_amount += parseFloat(obj.amount)
    //     existingProduct = await Product.findOne({product_code: obj.product_code});
    // })
    // console.log({invoice_number,reference_PO,customer,date,description,payment_terms,payment_due,date_paid,amount_paid,BIR_2307,SR,CR_Number,purchase_list
    // })
    total_amount = total_amount.toFixed(2)

    try {
        const existingSalesInvoice = await SalesInvoice.findOne({invoice_number});
        if (existingSalesInvoice) {
            // If a sales invoice with the same name exists, return an error response
            return res.status(400).json({ error: "Sales Invoice with the same invoice number already exists.",emptyFields });
        }
        const salesinvoice = await SalesInvoice.create({invoice_number,reference_PO,customer,date,description,
            total_amount,payment_terms,payment_due,date_paid,amount_paid,BIR_2307,SR,CR_Number,purchase_list
        })
        res.status(200).json(salesinvoice)
    } catch (error){
        res.status(400).json({error: error.message,emptyFields})
    }
}

const getAllSalesInvoices = async (req,res) => {
    const salesinvoice = await SalesInvoice.find({})
    .populate('customer')
    .sort({ invoice_number: 1 });

    // const salesinvoice = await SalesInvoice.find({}).sort({invoice_number: 1})
    // .populate('customer')
    res.status(200).json(salesinvoice)
}

const getSingleSalesInvoice = async (req,res)=>{
    const {invoice_number} = req.params
    let emptyFields = []
    console.log("invoice number here", invoice_number)
    if (!invoice_number){
        emptyFields.push('invoice_number')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please input the sales invoice number to be printed ',emptyFields})
    }
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const salesinvoice = await SalesInvoice.findOne({ invoice_number: invoice_number }).populate('customer');
    if(!salesinvoice){
        emptyFields.push('invoice_number')
        return res.status(404).json({error:'no sales invoice found by that invoice number',emptyFields})
    }
    res.status(200).json(salesinvoice)
}

const deleteSalesInvoice = async (req,res)=> {
    const {invoice_number} = req.params

    let emptyFields = []    //just so we can make the box turn red, but correct error message is still returned @ if !product
    if (!invoice_number){
        emptyFields.push('invoice_number')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please input the invoice number of the sales invoice to be deleted ',emptyFields})
    }
    // if(!mongoose.Types.ObjectId.isValid(id)){SalesInvoice
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const salesinvoice = await SalesInvoice.findOneAndDelete({ invoice_number: invoice_number });
    if(!salesinvoice){
        return res.status(404).json({error:'no sales invoice found by that invoice number'})
    }
    // dispatch needs return of all sales invoices
    const salesinvoices = await SalesInvoice.find({}).populate('customer').sort({invoice_number: 1})
    res.status(200).json(salesinvoices)
}

//UPDATE AT OWN RISK!!! DOES NOT REVERT STOCK DEDUCTION!
const updateSalesInvoice = async(req,res)=>{
    const {invoice_number} = req.params
    const {purchase_list} = req.body
    console.log("LIST",purchase_list)
    let emptyFields = []    //just so we can make the box turn red, but correct error message is still returned @ if !product
    if (!invoice_number){
        emptyFields.push('invoice_number')
    }
    if (!purchase_list || purchase_list.length == 0){       //OPTIONAL: turns invoice to nothing bought
        emptyFields.push('product_code')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Sales Invoice cannot be updated to no purchase ',emptyFields})
    }

    //checker of product_list
    let existingProduct
    let total_amount = 0
    for (const obj of purchase_list) {  //total_amount , check if product is real in inventory and if stock > quantity sa purchase list
        total_amount += parseFloat(obj.amount);
        try {
            existingProduct = await Product.findOne({ product_code: obj.product_code });
            if (!existingProduct) {
                // If a sales invoice with the same name exists, return an error response
                return res.status(400).json({ error: `The item ${obj.product_code} does not exist in inventory`,emptyFields });
            }
            if(obj.quantity > existingProduct.stock){
                return res.status(400).json({ error: `The item ${obj.product_code} does not have enough stock to fulfill the order`,emptyFields });
            }
        } catch (error){
            res.status(400).json({error: error.message,emptyFields})
        }
        // console.log(existingProduct)
        // Do something with existingProduct if needed
    }

      //for loop for actually updating inventory stock. separated because if suddenly one of them is error, some stock would hve been reduced
      for (const obj of purchase_list) {  //reduce stock by obj.quantity
        try {
            existingProduct = await Product.findOne({ product_code: obj.product_code });
            existingProduct.stock = existingProduct.stock - obj.quantity
            await existingProduct.save();

        } catch (error){
            res.status(400).json({error: error.message,emptyFields})
        }
        console.log(existingProduct)
        // Do something with existingProduct if needed
    }


    const salesinvoice = await SalesInvoice.findOneAndUpdate({
        invoice_number:invoice_number},{total_amount: total_amount,...req.body
    })

    if(!salesinvoice){
        return res.status(404).json({error:'no sales invoice found by that invoice number',emptyFields})
    }



    const salesinvoices = await SalesInvoice.find({}).populate('customer').sort({invoice_number: 1})

    res.status(200).json(salesinvoices)
}

const getDueSalesInvoices = async(req,res)=>{
    const currentDate = new Date();
    const page = req.query.page || 1
    //localhost:4000/email/?page=0
    const SIPerPage = 5

    const query = {
        payment_due: { $lt: currentDate },
        date_paid: { $eq: undefined },
        $expr: { $lt: ['$amount_paid', '$total_amount'] },
      };

    const totalSalesInvoices = await SalesInvoice.countDocuments(query);

    const salesinvoices = await SalesInvoice.find(query)
    .populate('customer')
    .sort({ invoice_number: 1 })
    .skip((page - 1) * SIPerPage)
    .limit(SIPerPage);

    const totalPages = Math.ceil(totalSalesInvoices / SIPerPage);

    res.status(200).json({
        salesinvoices,
        totalPages,
        currentPage: page,
      });

}


module.exports = {
    createSalesInvoice,
    getSingleSalesInvoice,
    getAllSalesInvoices,
    deleteSalesInvoice, //eradicate them from their digital existence!
    updateSalesInvoice,
    getDueSalesInvoices
}


//REQUESTS NOT YET TESTED