const { daoProductos } = require('../src/daos/index')
const { navItems } = require('./navItems')

const getHomeView = async(req, res) => {
    const product = await daoProductos.getAll();
    let { filename, cartAmount, cartId } = await navItems(req, res);
    res.status(200).render('pages/index', { product, session: req.user, cartAmount, cartId, filename });
}

module.exports = { getHomeView }