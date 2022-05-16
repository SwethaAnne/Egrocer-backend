var express = require('express');

var router = express.Router();

var productCtrl = require("../controllers/product-service");

router.post('/add', productCtrl.addProduct);
router.put('/edit', productCtrl.editProduct);
router.delete('/delete', productCtrl.deleteProduct);
router.post('/all', productCtrl.getAllProducts);
router.get('/product', productCtrl.getProduct);

module.exports = router;