
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

//UPDATE AT OWN RISK!!! DOES NOT REVERT STOCK DEDUCTION!    //if purchase_list is empty, do not recompute total_amount. else may nilagay na bago
//to overwrite so compute total_amount
const updateSalesInvoice = async(req,res)=>{
    const {reference_PO,customer,date,description,payment_terms,payment_due,date_paid,amount_paid,BIR_2307,SR,CR_Number,purchase_list
    }  = req.body
    const {invoice_number} = req.params
    let emptyFields = []    //just so we can make the box turn red, but correct error message is still returned @ if !product
    if (!invoice_number){
        emptyFields.push('invoice_number')
    }
    // if (!purchase_list || purchase_list.length == 0){       //OPTIONAL: turns invoice to nothing bought
    //     emptyFields.push('product_code')
    // }

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

    let salesinvoice;
    //preserve the current purchase_list if emty. wala naman kasing empty sales invoice dapat.
    if (!purchase_list || purchase_list.length == 0){       

        salesinvoice = await SalesInvoice.findOneAndUpdate(
            { invoice_number: invoice_number },
            {
                reference_PO: reference_PO,
                customer: customer,
                date: date,
                description: description,
                payment_terms: payment_terms,
                payment_due: payment_due,
                date_paid: date_paid,
                amount_paid: amount_paid,
                BIR_2307: BIR_2307,
                SR: SR,
                CR_Number: CR_Number
            },
            { new: true }
        );

    }

    else {
        salesinvoice = await SalesInvoice.findOneAndUpdate({
            invoice_number:invoice_number},{total_amount: total_amount, ...req.body
        })
    }   

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

const getTotalAmountSalesInvoices = async(req,res)=>{
    const {selectedMonths,selectedYear} = req.body
    const monthsArray = selectedMonths
    const year = parseInt(selectedYear,10)
    console.log("TYPE", typeof(year))

    const monthToNumber = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12
    };

    const monthsArrayNumeric = monthsArray.map((month) => monthToNumber[month]);

    console.log(monthsArrayNumeric, year)
 

    //match where year from $date == year (as int)
    //project is creating a new field where we get month from Date 
    //match where the month is in the request months
    //group them as to their month, get total then count how many docs
    const aggregationPipeline = [
        {
            $match:{
                $expr: { $eq: [{ $year: '$date' }, year] }
            }
        },
        {
            $project: {
                    month: { $month: '$date' },
                    total_amount: 1
                  },
        },
        {
            $match:{
                month: { $in: monthsArrayNumeric  }
            }
        },

        {
            $group: { _id: "$month", totalSum: { $sum: "$total_amount" }, count: { $sum: 1} }
         }
        
    ]
    //   const cursor = SalesInvoice.aggregate(aggregationPipeline);

    //   const salesinvoices = await cursor.toArray();
      const totalsales = await SalesInvoice.aggregate(aggregationPipeline);
      console.log("TOTALSALES",totalsales)
      res.status(200).json(totalsales)
    
}

const getAccountsReceivableSalesInvoices = async(req,res)=>{
    const currentDate = new Date();
    const query = {
        payment_due: { $lt: currentDate },
        date_paid: { $eq: undefined },
        $expr: { $lt: ['$amount_paid', '$total_amount'] },
      };
    const salesinvoices = await SalesInvoice.find(query)
    .populate('customer')
    .sort({ invoice_number: 1 })
    .lean(); //converts to JSON because MongoDB objects actually uses BSON. this makes obj.days_overdue = daysOverdue possible.

    let accounts_receivable = 0
    for (const obj of salesinvoices) {  //total_amount , check if product is real in inventory and if stock > quantity sa purchase list
        try {
            accounts_receivable += parseFloat(obj.total_amount);
            const paymentDueDate = new Date(obj.payment_due);

            //date magic 
            const daysOverdue = Math.floor((currentDate - paymentDueDate) / (1000 * 60 * 60 * 24));
            obj.days_overdue = daysOverdue;
        } catch (error){
            res.status(400).json({error: error.message})
        }
        // console.log(existingProduct)
        // Do something with existingProduct if needed
    }


    res.status(200).json({salesinvoices,accounts_receivable});

}

const getYearlySalesInvoices = async(req,res)=>{
    // const {year} = req.body
    const year = 2023;


    //match where year from $date == year (as int)
    //project is creating a new field where we get month from Date 
    //match where the month is in the request months
    //group them as to their month, get total then count how many docs
    const aggregationPipeline = [
        {
            $match:{
                $expr: { $eq: [{ $year: '$date' },year] }
            }
        },
        {
            $group: { _id: "$year", totalSum: { $sum: "$total_amount" }, count: { $sum: 1} }
         }
        
    ]
    //   const cursor = SalesInvoice.aggregate(aggregationPipeline);

    //   const salesinvoices = await cursor.toArray();
      const totalsales = await SalesInvoice.aggregate(aggregationPipeline);
      res.status(200).json(totalsales)
    
}





module.exports = {
    createSalesInvoice,
    getSingleSalesInvoice,
    getAllSalesInvoices,
    deleteSalesInvoice, //eradicate them from their digital existence!
    updateSalesInvoice,
    getDueSalesInvoices,
    getTotalAmountSalesInvoices,
    getAccountsReceivableSalesInvoices,
    getYearlySalesInvoices
}


   // const aggregationPipeline = [
    //     {
    //       $match: {
    //         date: { $exists: true },
    //         amount: { $exists: true },
    //         $expr: {
    //           $eq: [{ $year: '$date' }, parseInt(year, 10)] // Filter by year
    //         }
    //       }
    //     },
    //     {
    //       $project: {
    //         month: { $month: '$date' },
    //         amount: 1
    //       }
    //     },
    //     {
    //       $group: {
    //         _id: '$month',
    //         totalAmount: { $sum: '$amount' }
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         month: '$_id',
    //         totalAmount: 1
    //       }
    //     },
    //     {
    //       $match: {
    //         month: { $in: monthsArray.map(month => monthsArray.indexOf(month) + 1) }
    //       }
    //     }
    //   ];