const session = require('express-session');
const MongoStore = require('connect-mongo');
// const Mongoose = require('../../db/mongodb');
// const client = Mongoose.connection.getClient();

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports = session({
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTION_LINK,
        advancedOptions,
        collectionName: 'sessions'
    }),
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 10 * 60 * 1000 }
})