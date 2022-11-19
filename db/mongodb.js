const mongoose = require('mongoose');
const { logError, loggerConsole } = require('../controllers/middleware/logger-winston');


mongoose.connect(process.env.CONNECTION_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    if (err) return logError.error('Ocurrió un error al conectarse a la base de datos ' + error);
    loggerConsole.info('Base de datos conectada a través de MongoDb');
})

module.exports = mongoose;