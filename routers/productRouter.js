const router = require('express').Router();
const {
    getProducts,
    getProductsById,
    createProduct,
    updateProductsById
} = require('../controllers/productControllers');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post([authorize, admin], createProduct)
    .get(getProducts);

router.route('/:id')
    .get(getProductsById)
    .put([authorize, admin], updateProductsById);

module.exports = router;