const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
require('dotenv').config();
const rutas = require('./routes/index');
const cluster = require('cluster');
const { loggerConsole } = require('./controllers/middleware/logger-winston');
const numCpus = require('os').cpus().length;

// -------------------------------------------------CLUSTER------------------------------------------

if (cluster.isPrimary) {
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        loggerConsole.info(`Worker ${worker.process.pid} died`)
    })
} else {
    // ----------------------------------------------SERVIDOR------------------------------------------

    const app = express();
    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);
    const port = process.env.PORT || 8080;
    app.set('view engine', 'ejs');

    httpServer.listen(port, () => {
        loggerConsole.info(`Server listening on port ${port}`)
    })

    // ----------------------------------------------SESSION------------------------------------------

    const session = require('./controllers/middleware/session');
    const cookieParser = require('cookie-parser');
    const { passport } = require('./controllers/middleware/passport');

    // ----------------------------------------------APP.USE()------------------------------------------

    app.use(cookieParser());
    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', rutas);
    app.use(express.static(__dirname + '/views'));
}


// io.of('/carrito', socket => {
//     socket.on('deleted-cart', (code) => {

//     })
// })

// io.of('/')