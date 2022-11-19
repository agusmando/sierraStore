const express = require('express');
const router = express.Router();

const { getProfileView, editProfile } = require('../controllers/profile.js');
const { logged } = require('../controllers/middleware/auth')
const { uploadAvatar } = require('../controllers/middleware/multer')

router.route('/').get(logged, getProfileView).post(logged, uploadAvatar.single('avatar'), editProfile)

module.exports = router;