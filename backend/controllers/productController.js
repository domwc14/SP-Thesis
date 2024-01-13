//TO CONSIDER?: on update and delete, we are querying DB for the entire documents then returning everything.
//is this more efficient alternative?  // inventory_list: [action.payload,...state.inventory_list] in reducer function at context might be better
//but shows the document twice (new from action.payload) and old version from previous state). Still need to filter the old version out of prev state

const Product = require('../models/productModel')
const monthlyInventory = require('../models//monthlyInventoryModel')
const mongoose = require('mongoose')
const createProduct = async (req,res) => {
    const {product_code, stock, type , size , color ,description, acquisition_price, unit_price, unit} = req.body
    let {stocktrigger_at} = req.body
    
    // if(!stocktrigger_at){   //if no trigger, default is alerted at 0
    //     stocktrigger_at = 0; //BUT sometimes we can have items na one-time, dont wanna restock
    // }
    //This is for the InventoryForm: so that fields that are required can turn red
    let emptyFields = []
    if (!product_code){
        emptyFields.push('product_code')
    }
    if (!stock){
        emptyFields.push('stock')
    }
    if (!type){
        emptyFields.push('type')
    }
    if (!size){
        emptyFields.push('size')
    }
    if (!color){
        emptyFields.push('color')
    }
    if (!acquisition_price){
        emptyFields.push('acquisition_price')
    }
    // if (!description){
    //     emptyFields.push('description')
    // }
    if (!unit_price){
        emptyFields.push('unit_price')
    }
    // if (!unit){
    //     emptyFields.push('unit')
    // }
    // if (!stocktrigger_at){
    //     emptyFields.push('stocktrigger_at')
    // }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in fields highlighted in red ',emptyFields})
    }
    if (!stocktrigger_at){
        stocktrigger_at = 0
    }

    try {
        const existingProduct = await Product.findOne({product_code});
        if (existingProduct) {
            // If a customer with the same name exists, return an error response
            return res.status(400).json({ error: "Product with the same Product Code already exists.",emptyFields });
        }
        const product = await Product.create({product_code, stock, type , size , color ,description, acquisition_price, unit_price, unit,stocktrigger_at})
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
        return res.status(404).json({error:'No product found by that product code'})
    }
    res.status(200).json(product)
}

const deleteProduct = async (req,res)=> {
    const {product_code} = req.params

    let emptyFields = []    //just so we can make the box turn red, but correct error message is still returned @ if !product
    if (!product_code){
        emptyFields.push('product_code')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in fields highlighted in red ',emptyFields})
    }

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    const product = await Product.findOneAndDelete({ product_code: product_code });
    if(!product){
        return res.status(404).json({error:'No product found by that Product Code',emptyFields})
    }

    // const products = await Product.find({}).sort({product_code: 1})
    // res.status(200).json(products)
    res.status(200).json(product)


}

const updateProduct = async(req,res)=>{
    
    const {product_code} = req.params

    let emptyFields = []    //just so we can make the box turn red, but correct error message is still returned @ if !product
    if (!product_code){
        emptyFields.push('product_code')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in fields highlighted in red ',emptyFields})
    }

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error:'invalid ID'})
    // }
    //instead of ...req.body, we change everything except delivery_id. 
    //we can still use req.body basta walang changing ng product_code sa body naten
    const product = await Product.findOneAndUpdate({
        product_code:product_code},{...req.body},{new: true})

    if(!product){
        return res.status(404).json({error:'no product found by that number/id',emptyFields})
    }

    //returns just like getAll including the one updated
    // const products = await Product.find({}).sort({product_code: 1})
    // res.status(200).json(products)

    res.status(200).json(product)
}

const createmonthlyInventory = async (req,res) => {
   
    const aggregationPipeline = [
    {
        $project: {
            totalAmount: {
                $round: [{ $multiply: ['$stock', '$acquisition_price'] }, 2], // Round to 2 decimal places
              },
        }
    },
    {
        $group: {
        _id: null,
        totalAmount: { $sum: '$totalAmount' },
        },
    },
    ];

    //change tempdate to date when done
    date = new Date();
    const currentMonth = date.getMonth() + 1; // Note: Months are zero-based, so add 1 to get the actual month (1-12).
    const currentYear = date.getFullYear();

    console.log(`Current Month: ${currentMonth}`);
    console.log(`Current Year: ${currentYear}`);
        //emptyFields maybe?
    
    let new_inventory_value
    new_inventory_value = await Product.aggregate(aggregationPipeline); //result is an array
    new_inventory_value = new_inventory_value[0].totalAmount
    try {
        const existingEntry = await monthlyInventory.findOne({
            $expr: {
                $and: [
                    { $eq: [{ $month: '$date' }, currentMonth] },
                    { $eq: [{ $year: '$date' }, currentYear] },
                    ],
            },
        });
        if (existingEntry) {
            //overwrite the current month data.
            existingEntry.date = date
            existingEntry.inventory_value = new_inventory_value
            res.status(200).json(existingEntry)
        }
        else {
            const newEntry = await monthlyInventory.create({date: date, inventory_value: new_inventory_value})
            res.status(200).json(newEntry)

        }
    } catch (error){
        res.status(400).json({error: error.message})
    }

}

const getAllmonthlyInventory = async (req,res) => {
    const monthlyTotals = await monthlyInventory.find({}).sort({date: 1})
    res.status(200).json(monthlyTotals)
}

const getAllmonthlyByYear = async (req,res) => {
    const {selectedYear3} = req.body
    const monthlyTotals = await monthlyInventory.find({
        $expr: {
            $eq: [{ $year: '$date' }, selectedYear3]
        }
    }).sort({ date: 1 });
    // console.log("THIS IS SENT BACK", monthlyTotals)
    res.status(200).json(monthlyTotals)
}





module.exports = {
    createProduct,
    getSingleProduct,
    getAllProducts,
    deleteProduct, //eradicate them from their digital existence!
    updateProduct,
    createmonthlyInventory,
    getAllmonthlyInventory,
    getAllmonthlyByYear
}