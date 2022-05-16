var express = require('express');
var router = express.Router();

var userService = require('../services/routes/user-route');
var cartService = require('../services/routes/cart-route');
var productService = require('../services/routes/product-route');

router.use('/user', userService);
router.use('/cart', cartService);
router.use('/product', productService);

module.exports = router;