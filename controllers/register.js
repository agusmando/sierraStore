const { userExists, saveUser } = require('./middleware/validation.js');
const path = require('path');
const fs = require('fs');
const { logWarn, logError } = require('./middleware/logger-winston.js');

const getRegisterView = (req, res) => {
    res.status(200).render('pages/register');
}

const registerUser = async(req, res) => {
    const { username, password, name, address, phoneNumber } = req.body;
    try {
        if (await userExists(username)) {
            logWarn.warn(`El usuario ${username} ya existe`)
                // res.sendFile(path.join(__dirname, '..', 'public', 'register-error.html'))
            fs.unlink(path.join(__dirname, '..', 'views', 'uploads', 'profiles', req.file.filename), () => console.log('Eliminado'))
        } else {
            const avatar = req.file.filename;
            let cart = -1;
            await saveUser(username, password, name, address, phoneNumber, avatar, "customer", cart)
            res.redirect('/login')
        }
    } catch (error) {
        logError.error('No se ha podido completar el registro ' + error)
    }
}

module.exports = { getRegisterView, registerUser }