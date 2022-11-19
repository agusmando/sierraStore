const express = require('express');
const router = express.Router();
const {
    getOneProduct,
    getAllProducts,
    postProduct,
    deleteProduct,
    editProduct,
} = require('../controllers/products')

const { auth } = require('../controllers/middleware/auth');
const { uploadProduct } = require('../controllers/middleware/multer');

router.route('/').get(getAllProducts).post(auth, uploadProduct.single('thumbnail'), postProduct);
router.route('/:code').get(getOneProduct).delete(auth, deleteProduct).put(auth, editProduct);


module.exports = router;