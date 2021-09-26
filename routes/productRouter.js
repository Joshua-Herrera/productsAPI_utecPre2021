const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router()

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.addProduct)
    .patch(productController.updateProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

router.route('/:id')
    .get(productController.getOneProduct)
    .patch(productController.updateProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;