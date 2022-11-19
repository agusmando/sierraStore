const { logError } = require('./logger-winston')

const auth = (req, res, next) => {
    if (req.user.role == "admin") {
        return next();
    }
    logError.error("Auth error: User is not authenticated");
    res.status(401).json({ error: -1, descripcion: `Ruta ${req.originalUrl}, método ${req.method} no autorizado` })
}

const logged = (req, res, next) => {
    try {
        if (req.user) {
            next();
        } else {
            res.redirect('/login')
        }
    } catch (err) {
        logError.error("User is not logged " + err);
    }
}

module.exports = { auth, logged }