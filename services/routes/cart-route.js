var express = require('express');

var router = express.Router();

var cartCtrl = require("../controllers/cart-service");

router.post('/addToCart', cartCtrl.addProductToCart);
router.delete('/deleteFromCart', cartCtrl.deleteProductFromCart);
router.get('/cart', cartCtrl.getProductsInCart);

module.exports = router;