const express = require('express');
const router = express.Router();

const { getProductView } = require('../controllers/products');

router.route('/:code').get(getProductView)

module.exports = router;