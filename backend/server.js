const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')

const salesInvoiceRoutes = require('./routes/salesinvoice')
const customerRoutes = require('./routes/customer')
const productRoutes = require('./routes/product')
const deliveryRoutes = require('./routes/delivery')
const emailRoutes = require('./routes/email')

const userRoutes = require('./routes/user')

const app = express();

//comment this out when not production
const path = require('path')
app.use(express.static(path.join(__dirname+"/public")))

//middleware
app.use(express.json())


app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//routes is relattive to this URL
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

app.use('/customers',customerRoutes)
app.use('/product',productRoutes)
app.use('/delivery',deliveryRoutes)
app.use('/salesinvoice',salesInvoiceRoutes)
app.use('/email',emailRoutes)

app.get('/',(req,res)=>{
    res.json({msg: 'Welcome to app'})
});

mongoose.connect(process.env.dbURI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(process.env.PORT)
        });    
    })
    .catch((error)=>{
        console.log(error)
    })

//TEMPORARY FOR POPULATION
// const SalesInvoice = require('./models/salesInvoiceModel');

// const Chance = require('chance');
// const chance = new Chance();
// const db = mongoose.connection;

// const generateRandomInvoice = (i) => {
//     const purchase_list = Array.from({ length: chance.integer({ min: 1, max: 5 }) }, () => ({
//         product_code: chance.string(),
//         quantity: chance.integer({ min: 1, max: 10 }),
//         amount: chance.floating({ min: 900, max: 1000, fixed: 2 }),
//         }));

//     return {
//         invoice_number: i, //chance.string(),
//         reference_PO: i, //chance.string(),
//         customer: "653f97fbb70585360cf38071",
//         date: chance.date(),
//         description: chance.sentence(),
//         payment_terms: chance.word(),
//         payment_due: chance.date({year: 2022}),
//         //date_paid: chance.date(),
//         amount_paid: chance.floating({ min: 1, max: 300, fixed: 2 }),
//         BIR_2307: chance.floating({ min: 1, max: 1000, fixed: 2 }),
//         SR: chance.string(),
//         CR_Number: chance.string(),
//         purchase_list: purchase_list,
//         total_amount: purchase_list.reduce((total, item) => total + item.amount, 0)
//     };
//   };


//   const saveSalesInvoice = async () => {
//     //await SalesInvoice.deleteMany({})
//     for (let i = 0; i < 5; i++) {
//       const randomSalesInvoice = generateRandomInvoice(i);
//       const salesInvoice = new SalesInvoice(randomSalesInvoice);
//       try {
//         await salesInvoice.save();

//       } catch (err) {
//         console.error('Error saving document:', err);
//       }
//     }
//   };

//  saveSalesInvoice();

