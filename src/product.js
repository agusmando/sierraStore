class Product {
    constructor(name, description, code, thumbnail, price, stock) {
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
        this.timestamp = new Date().getTime();
    }
}

module.exports = Product