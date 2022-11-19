const { daoCarritos } = require('../src/daos/index');
const { logWarn } = require('./middleware/logger-winston');

const logout = async(req, res) => {
    try {
        const containsProducts = await daoCarritos.getCartProducts(req.user.cart)
        if (containsProducts.length <= 1) {
            await cart.delete(req.user.cart)
        }
    } catch (error) {
        logWarn.warn('El carrito no contiene productos: ' + error)
    }
    req.session.destroy();
    res.redirect('/login')
}
module.exports = { logout };