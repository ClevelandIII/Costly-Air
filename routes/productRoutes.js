const express = require('express')
const {getAllProducts, createProduct, getProduct} = require('../controllers/productController')
const {uploadImage} = require('../controllers/imageUploadController')

const router = express.Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:name').get(getProduct)
router.route('/uploads').post(uploadImage)

module.exports = router