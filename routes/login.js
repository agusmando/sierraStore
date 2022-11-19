const express = require('express');
const router = express.Router();

const { authenticate } = require('../controllers/middleware/passport')
const { getLoginView, loginAction } = require('../controllers/login');

router.route('/').get(getLoginView).post(authenticate, loginAction);

module.exports = router;