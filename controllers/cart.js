const { daoCarritos } = require('../src/daos/index');
const { daoProductos } = require('../src/daos/index'); //me permite obtener información del dao ya creado sin correr riesgos de dependencias circulares
const { navItems } = require('./navItems');
const User = require('../models/user');
const { confirmedPurchase } = require('./middleware/email');
const { sendMessage } = require('./middleware/twilio');
const { logError } = require('./middleware/logger-winston')

const createCart = async(req, res) => {
    const newCartId = await daoCarritos.createCart();
    await User.updateOne({ username: req.user.username }, { cart: newCartId })
    return newCartId;
}

const deleteCart = async(req, res) => {
    await deleteCartFunction(Number(req.params['id']));
    res.status(204).json({ success: 'true' })
}

const getCartProducts = async(req, res) => {
    let list;
    try {
        list = await daoCarritos.getCartProducts(Number(req.params['id']));
    } catch (error) {
        logError.error('No se pudieron obtener los productos ' + error)
    }
    res.status(200).json({ result: list });
}

const addToCart = async(req, res) => {
    let productsList = 0;
    try {
        productsList = await daoCarritos.getCartProducts(req.user.cart)
    } catch (error) { logError.error('No se pudieron obtener los productos ' + error) }
    let idProduct = -1; //id dentro del carrito, no su código
    let amount = Number(req.body['amount']);
    if (productsList != null) {
        for (let i = 0; i < productsList.length; i++) {
            if (productsList[i].code == req.params['prod_code']) {
                console.log(productsList[i])
                idProduct = productsList[i].id; //para ver si hay productos iguales y cuantos
                amount += productsList[i].amount;
                break;
            }
        }
    }
    if (idProduct == -1) {
        let product = await daoProductos.getByCode(req.params['prod_code'])
        product = product.toObject();
        product.amount = amount;
        product.id = productsList.length;
        await daoCarritos.addToCart(Number(req.params['id']), product)
    } else {
        await daoCarritos.incrementProductAmount(Number(req.params['id']), idProduct, amount)
    }

    res.status(200).json({ success: 'true' })
}

const removeFromCart = async(req, res) => {
    await daoCarritos.removeFromCart(Number(req.params['id']), Number(req.params['prod_code']))
    res.status(200).json({ success: 'true' })
}

const getCartView = async(req, res) => {
    let { filename, cartAmount, productsList, cartId } = await navItems(req, res);
    let totalAmount = 0,
        shipmentTotalAmount = 0
    if (productsList != null) {
        for (let i = 0; i < productsList.length; i++) {
            totalAmount += productsList[i].price * productsList[i].amount;
            shipmentTotalAmount += (productsList[i].price * productsList[i].amount) / 700;
        }
        totalAmount = Math.round(totalAmount * 100) / 100;
        shipmentTotalAmount = Math.round(shipmentTotalAmount * 100) / 100;
    }
    return res.status(200).render('pages/cart', { session: req.user, filename, cartAmount, cartId, productsList, totalAmount, shipmentTotalAmount })
}



const success = async(req, res) => {
    console.log(req.body)
    try {
        const products = await daoCarritos.getCartProducts(req.user.cart);
        data = {
            name: req.user.name,
            username: req.user.username,
            products,
            number: req.user.phoneNumber
        }
        await daoCarritos.removeAllProducts(req.user.cart)
            // await sendMessage(data)
            // await confirmedPurchase(data);
    } catch (error) {
        logError.error('No se pudieron obtener los productos ' + error)
    }
    res.render('pages/confirmedPurchase')
}

module.exports = {
    createCart,
    deleteCart,
    getCartProducts,
    addToCart,
    removeFromCart,
    getCartView,
    success
};