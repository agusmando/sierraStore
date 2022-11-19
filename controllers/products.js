const { daoProductos } = require('../src/daos/index');
const { navItems } = require('./navItems')
const getOneProduct = async(req, res) => {
    const result = await daoProductos.getByCode(req.params['code']);
    res.status(200).json({ result });
}

const getAllProducts = async(req, res) => {
    return await daoProductos.getAll();
}

const postProduct = async(req, res) => {
    const { name, description, code, price, stock } = req.body;
    const thumbnail = req.file.filename;
    console.log(thumbnail)
    await daoProductos.createProduct(name, description, code, thumbnail, price, stock);
    res.status(201).json({ success: 'true' });
}

const editProduct = async(req, res) => {
    const product = await daoProductos.getByCode(req.params['code'])
    const attr = req.body;
    product.name = attr.name;
    product.description = attr.description;
    product.thumbnail = attr.thumbnail;
    product.price = attr.price;
    product.stock = attr.stock;
    daoProductos.update(product);
    res.status(200).json({ success: 'true' });
}

const deleteProduct = async(req, res) => {
    await daoProductos.deleteProduct(req.params['code'])
    res.status(201).json({ success: 'true' })
}

const getProductView = async(req, res) => {
    const product = await daoProductos.getByCode(req.params['code']);
    const date = new Date();
    date.setDate(date.getDate() + 15);
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    let { filename, cartAmount, cartId } = await navItems(req, res);
    res.status(200).render('pages/product', { session: req.user, cartAmount, cartId, filename, product, futureDate: date, futureMonth: monthNames[date.getMonth()] });
}

const adminAddProductView = (req, res) => {
    res.status(200).render('pages/addProduct')
}

module.exports = {
    getAllProducts,
    getOneProduct,
    postProduct,
    editProduct,
    deleteProduct,
    getProductView,
    adminAddProductView,
};