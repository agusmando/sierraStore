const { daoCarritos } = require('../src/daos/index');
const { logError } = require('./middleware/logger-winston');
const User = require('../models/user');

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
    let resultado;
    try {
        resultado = await daoCarritos.getCartProducts(req.user.cart);
    } catch (error) {
        logError.error('No se pudo obtener el carrito ' + error)
    }
    if (resultado == null) {
        const newCartId = await daoCarritos.createCart();
        await User.updateOne({ username: req.user.username }, { cart: newCartId })
    }
    res.redirect('/');
}

module.exports = { getLoginView, sessionData, loginAction }