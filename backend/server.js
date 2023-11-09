const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose')



const workoutRoutes = require('./routes/workouts')

const salesInvoiceRoutes = require('./routes/salesinvoice')
const customerRoutes = require('./routes/customer')
const productRoutes = require('./routes/product')
const deliveryRoutes = require('./routes/delivery')

const userRoutes = require('./routes/user')

const app = express();

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


