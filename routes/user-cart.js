const express = require('express');
const router = express.Router();

const { getCartView, success } = require('../controllers/cart');
const { logged } = require('../controllers/middleware/auth')

router.route('/').get(logged, getCartView)
router.route('/success').get(logged, success);

module.exports = router;