const express = require('express');
const router = express.Router();
const {
    createCart,
    deleteCart,
    getCartProducts,
    addToCart,
    removeFromCart
} = require('../controllers/cart')
const { logged } = require('../controllers/middleware/auth')

router.route('/').post(createCart);
router.route('/:id').delete(deleteCart);
router.route('/:id/productos').get(logged, getCartProducts);
router.route('/:id/productos/:prod_code').delete(logged, removeFromCart).post(logged, addToCart);

module.exports = router;