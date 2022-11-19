const { logError } = require('../../controllers/middleware/logger-winston');
const Mongoose = require('../../db/mongodb');

class ContenedorMongo {
    constructor(model) {
        this.model = model;
    }

    async create(object) {
        try {
            await object.save()
        } catch (error) {
            logError.error('MongoDB error al crear un objeto ' + error)
        }
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {

            logError.error('MongoDB error al obtener todos los objetos ' + error)
        }
    }

    async getById(id) {
        try {
            return await this.model.findOne({ id: `${id}` });
        } catch (error) {
            logError.error('MongoDB error al obtener objeto por id ' + error)
        }
    }

    async update(id, differences) {
        try {
            await this.model.updateOne({ id: `${id}` }, { $set: { differences } })
        } catch (error) {
            logError.error('MongoDB error actualizar un objeto ' + error)
        }
    }

    async delete(id) {
        try {
            await this.model.deleteOne({ id: `${id}` })
        } catch (error) {
            logError.error('MongoDB error al eliminar un objeto ' + error)
        }
    }
}

module.exports = ContenedorMongo;