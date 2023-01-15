const router = require('express').Router();
const {
    createCartItem,
    getCartItem,
    updateCartItem,
    deleteCartItem
} = require('../controllers/cartControllers');
const authorize = require('../middlewares/authorize');

router.route('/')
    .get(authorize, getCartItem)
    .post(authorize, createCartItem)
router.route('/:id')
    .put(authorize, updateCartItem)
    .delete(authorize, deleteCartItem)

module.exports = router;