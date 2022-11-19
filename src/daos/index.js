let daoCarritos;
let daoProductos;

switch (process.env.STORAGE) {
    case "firebase":
        const CarritosDaoFirebase = require('./carritos/carritosDaoFirebase.js');
        const ProductosDaoFirebase = require('./productos/productosDaoFirebase.js');

        daoCarritos = new CarritosDaoFirebase();
        daoProductos = new ProductosDaoFirebase();
        break;
    case "memory":
        const CarritosDaoMemoriaArchivo = require('./carritos/carritosDaoMemoriaArchivo.js');
        const ProductosDaoMemoriaArchivo = require('./productos/productosDaoMemoriaArchivos.js');

        daoCarritos = new CarritosDaoMemoriaArchivo("carritos");
        daoProductos = new ProductosDaoMemoriaArchivo("productos");
        break;
    case "mongo":
        const CarritosDaoMongo = require('./carritos/carritosDaoMongo.js');
        const ProductosDaoMongo = require('./productos/productosDaoMongo.js');

        daoCarritos = new CarritosDaoMongo("carritos");
        daoProductos = new ProductosDaoMongo("productos");
        break;

}


module.exports = {
    daoCarritos,
    daoProductos
}