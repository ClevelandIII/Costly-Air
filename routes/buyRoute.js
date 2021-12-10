const express = require('express')
const {buyCart} = require('../controllers/buyController')
const router = express.Router()

router.route('/').post(buyCart)

module.exports = router