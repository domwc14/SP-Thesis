const express = require('express')
//import OR require. YOU CAN ONLY USE ONE for the whole program

const {
    createProduct,
    getSingleProduct,
    getAllProducts,
    deleteProduct, //eradicate them from their digital existence!
    updateProduct,
    createmonthlyInventory,
    getAllmonthlyInventory
} = require('../controllers/productController')
const router = express.Router()

router.get('/',getAllProducts)
router.post('/addproduct', createProduct)

router.get('/getAllmonthly', getAllmonthlyInventory)
router.post('/addmonthly', createmonthlyInventory)



router.get('/:product_code', getSingleProduct)
router.delete('/:product_code',deleteProduct)
router.patch('/:product_code',updateProduct)

module.exports = router