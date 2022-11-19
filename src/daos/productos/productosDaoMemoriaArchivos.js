//get by code
const ContenedorMemoriaArchivo = require('../../contenedores/ContenedorMemoriaArchivo');
const Product = require('../../product');

class ProductosDaoMemoriaArchivo extends ContenedorMemoriaArchivo {
    constructor(nombreArchivo) {
        super(nombreArchivo);
    }

    createProduct(name, description, code, thumbnail, price, stock) {
        const newProduct = new Product(name, description, code, thumbnail, price, stock);
        super.save(newProduct);
    }

    deleteProduct(code) {
        const list = super.getAll();
        const value = list.filter(product => product.code == code);
        super.delete(value[0].id);
    }

    getByCode(code) {
        return super.getAll().filter(products => products.code == code)[0];
    }

    editProduct(changedProduct) {
        super.update(changedProduct);
    }
}

module.exports = ProductosDaoMemoriaArchivo;