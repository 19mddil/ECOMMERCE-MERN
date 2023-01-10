const router = require('express').Router();
const {
    getProducts,
    getProductsById,
    createProduct,
    updateProductsById,
    getPhotoById
} = require('../controllers/productControllers');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post([authorize, admin], createProduct)
    .get(getProducts);

router.route('/:id')
    .get(getProductsById)
    .put([authorize, admin], updateProductsById);

router.route('/photo/:id')
    .get(getPhotoById);

module.exports = router;