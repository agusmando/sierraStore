const { daoCarritos } = require('../src/daos/index');
const { logError } = require('./middleware/logger-winston');

const navItems = async(req, res) => {
    let filename = "",
        productsList = [],
        cartAmount = 0,
        cartId = -1;
    if (req.user) {
        cartId = req.user.cart;
        filename = req.user.profilePicture;
        try {
            productsList = await daoCarritos.getCartProducts(cartId);
            cartAmount = productsList.length;
        } catch (error) {
            logError.error('No se pudieron obtener los productos ' + error)
            productsList = 0;
        }
    }
    return { filename, productsList, cartAmount, cartId }
}

module.exports = { navItems }