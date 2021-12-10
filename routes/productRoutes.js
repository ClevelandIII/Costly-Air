const express = require('express')
const {getAllProducts, createProduct} = require('../controllers/productController')
const {uploadImage} = require('../controllers/imageUploadController')

const router = express.Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/uploads').post(uploadImage)

module.exports = router