const express = require('express');
const router = express.Router();

const { getHomeView } = require('../controllers/home');
const { adminAddProductView } = require('../controllers/products')
const { auth } = require('../controllers/middleware/auth')

router.route('/').get(getHomeView);
router.route('/add-product').get(auth, adminAddProductView)

module.exports = router;