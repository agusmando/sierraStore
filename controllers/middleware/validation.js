const User = require('../../models/user.js');
const bcrypt = require('bcrypt');
const { registerMail } = require('./email')
const { loggerConsole } = require('./logger-winston')


const userExists = async(username) => {
    const user = await User.findOne({ username })
    if (user) return true;
    else return false;
}

//Registra el usuario hasheando la contraseña
const saveUser = async(username, password, name, address, phoneNumber, profilePicture, role, cart) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
        name,
        address,
        phoneNumber,
        profilePicture,
        role,
        cart
    })

    await newUser.save()
    loggerConsole.info(`Usuario ${username} creado con éxito`)
    registerMail(newUser)
}

module.exports = { userExists, saveUser };