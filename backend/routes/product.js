const express = require('express')
//import OR require. YOU CAN ONLY USE ONE for the whole program

const {
    createProduct,
    getSingleProduct,
    getAllProducts,
    deleteProduct, //eradicate them from their digital existence!
    updateProduct
} = require('../controllers/productController')
const router = express.Router()

router.get('/',getAllProducts)
router.post('/addproduct', createProduct)
router.get('/:product_code', getSingleProduct)
router.delete('/:product_code',deleteProduct)
router.patch('/:product_code',updateProduct)

module.exports = router