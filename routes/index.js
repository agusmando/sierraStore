const express = require('express');
const router = express.Router();
const cart = require('./cart');
const product = require('./products');
const home = require('./home');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const customProduct = require('./custom-product');
const userCart = require('./user-cart.js');
const profile = require('./profile');

router.use('/api/productos', product);
router.use('/api/carrito', cart);
router.use('/', home);
router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/producto', customProduct);
router.use('/carrito', userCart);
router.use('/perfil', profile);

module.exports = router;