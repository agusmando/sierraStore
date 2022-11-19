const express = require('express');
const router = express.Router();

const { logout } = require('../controllers/logout.js');

router.route('/').get(logout);

module.exports = router;