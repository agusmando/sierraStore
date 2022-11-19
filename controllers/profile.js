const User = require('../models/user');
const fs = require('fs');
const path = require('path')
const { navItems } = require('./navItems');
const { logError } = require('./middleware/logger-winston');

const getProfileView = async(req, res) => {

    let { filename, cartAmount, cartId } = await navItems(req, res);
    res.render('pages/profile', { session: req.user, filename, cartAmount, cartId });
}

const editProfile = async(req, res) => {
    const { name, username, address, phoneNumber } = req.body;
    let changes = false;
    if (name != req.user.name) changes = true;
    if (username != req.user.username) changes = true;
    if (address != req.user.address) changes = true;
    if (phoneNumber != req.user.phoneNumber) changes = true;
    if (req.file != null) {
        changes = true;
        fs.unlink(path.join(__dirname, '..', 'views', 'uploads', 'profiles', req.user.profilePicture), () => console.log('Imagen anterior eliminada'))
    }
    try {
        if (changes) {
            if (req.file) {
                await User.updateOne({ username: req.user.username }, { name, username, address, phoneNumber, profilePicture: req.file.filename })
            } else { await User.updateOne({ username: req.user.username }, { name, username, address, phoneNumber }) }
        }
    } catch (error) {
        logError.error('Error al modificar el usuario ' + error)
    }
    res.redirect('/')
}

module.exports = { getProfileView, editProfile }