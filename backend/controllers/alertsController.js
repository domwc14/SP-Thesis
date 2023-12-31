const SalesInvoice = require('../models/salesInvoiceModel')
const Product = require('../models/productModel')
const mongoose = require('mongoose')

const getAlerts = async(req,res)=>{
    //const currentDate = new Date();

    const page = req.query.page || 1
    //localhost:4000/email/?page=0
    const AlertsPerPage = 5

    const query = {
        $expr: { $lte: ['$stock', '$stocktrigger_at'] },

      };

    //is actualy totalProducts , but since all of our alerts so far are just the number of low stock products
    //we can rename it as totalAlerts
    const totalAlerts = await Product.countDocuments(query);

    const alerts = await Product.find(query)
    .sort({ product_code: 1 })
    .skip((page - 1) * AlertsPerPage)
    .limit(AlertsPerPage);

    const totalPages = Math.ceil(totalAlerts / AlertsPerPage);

    res.status(200).json({
        alerts,
        totalPages,
        currentPage: page,
      });

}

// const patchTriggerto0 = async (req,res) => {
//     try {
//         const result = await Product.updateMany({ stocktrigger_at: { $exists: false } }, { $set: { stocktrigger_at: 0 } });
//         res.status(200).json(result)
//     } catch (error){
//         res.status(400).json({error: error.message})
//     }
// }

module.exports = {
    getAlerts,
    //patchTriggerto0
}