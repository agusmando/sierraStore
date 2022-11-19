const { productos } = require('../../../models/products');
const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');

class ProductoDaoMongo extends ContenedorMongoDB {
    constructor() {
        super(productos);
    }

    async createProduct(name, description, code, thumbnail, price, stock) {
        const object = new productos({
            name,
            description,
            code,
            thumbnail,
            price,
            stock,
        })
        await super.create(object)
    }

    async getByCode(code) {
        return await this.model.findOne({ code: `${code}` });

    }

    async deleteProduct(code) {
        await this.model.deleteOne({ code: `${code}` });
    }

    async update(product) {
        const differences = {
            name: product.name,
            description: product.description,
            code: product.code,
            thumbnail: product.thumbnail,
            price: product.price,
            stock: product.stock,
        }
        await this.model.update({ code: `${product.code}` }, { $set: differences })
    }
}

module.exports = ProductoDaoMongo;