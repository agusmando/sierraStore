const ContenedorMemoriaArchivo = require('../../contenedores/ContenedorMemoriaArchivo');
const Cart = require('../../cart');

class CarritosDaoMemoriaArchivo extends ContenedorMemoriaArchivo {
    constructor(nombreArchivo) {
        super(nombreArchivo)
    }

    createCart() {
        const newCart = new Cart();
        super.save(newCart);
    }

    deleteCart(id) {
        return super.delete(id);
    }

    getCartProducts(id) {
        return super.getById(id).productos;
    }

    addToCart(id, product) {
        const cart = super.getById(id);
        cart.productos.push(product)
        return super.update(cart);
    }

    removeFromCart(id, productCode) {
        const cart = super.getById(id);
        const product = cart.productos.filter(product => product.code == productCode);
        const value = cart.productos.indexOf(product[0]);
        cart.productos.splice(value, value + 1);
        return super.update(id);
    }
}

module.exports = CarritosDaoMemoriaArchivo;