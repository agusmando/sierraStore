const { createTransport } = require('nodemailer');
const { logError } = require('./logger-winston')

const admin = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: admin.email,
        pass: admin.password
    }
})


const registerMail = async(data) => {
    const emailContent = {
        from: "sierrastore@gmail.com",
        to: admin.email,
        subject: "Nuevo registro",
        html: `<h1>Nuevo usuario registrado en Sierra</h1><p>Nombre: ${data.name}</p><p>Email: ${data.username}</p>`
    }
    try {
        await transporter.sendMail(emailContent);
    } catch (error) {
        logError.error("Error al enviar mail de registro: " + err);
    }
}

const productsList = (data) => {
    let liContainer = "";
    for (let i = 0; i < data.products.length; i++) {
        liContainer += `<li>${data.products[i].amount} ${data.products[i].name}</li>` //Ver como se llama Cuando lo traemos
    }
    return liContainer;
}

const confirmedPurchase = async(data) => {
    const emailContent = {
        from: "sierrastore@gmail.com",
        to: admin.email,
        subject: `Nuevo pedido de ${data.name}`,
        html: `<h1>Pedido en Sierra</h1><p>Comprador: ${data.name}</p><p>Email: ${data.username}</p><ul>${productsList(data)}</ul>`
    }
    try {
        await transporter.sendMail(emailContent);
    } catch (error) {
        logError.error("Error al enviar mail de confirmación de pedido: " + err);
    }

}

module.exports = { registerMail, confirmedPurchase }