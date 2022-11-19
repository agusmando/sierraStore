const express = require('express');
const router = express.Router();

const { uploadAvatar } = require('../controllers/middleware/multer')

const { getRegisterView, registerUser } = require('../controllers/register');

router.route('/').get(getRegisterView).post(uploadAvatar.single('avatar'), registerUser); //sirve para llenar req.body sin cargar imagen hasta estar segurosñ

module.exports = router;