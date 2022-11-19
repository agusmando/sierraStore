const cartController = require('./cart');
const { daoCarritos } = require('../src/daos/index');
const { logError } = require('./middleware/logger-winston')

const getLoginView = (req, res) => {
    if (req.user) {
        res.redirect('/');
    }
    res.status(200).render('pages/login');
}

const sessionData = (req, res) => {
    if (req.user) {
        res.status(200).json({ username: req.user.username })
    } else res.status(404).json({ message: 'Session has not been created' })
}

const loginAction = async(req, res) => {
    try {
        const resultado = await daoCarritos.getCartProducts(req.user.cart);
        if (resultado == null) {
            await cartController.createCart(req, res);
        }
    } catch (error) {
        logError.error('No se pudo crear el carrito ' + error)
    }
    res.redirect('/');
}

module.exports = { getLoginView, sessionData, loginAction }