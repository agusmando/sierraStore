const multer = require('multer')
const path = require('path')

let uploadAvatar = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'views/uploads/profiles')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
})

let uploadProduct = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'views/uploads/products')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
})

module.exports = { uploadAvatar, uploadProduct }