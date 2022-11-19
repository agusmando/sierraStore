const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { logWarn } = require('./logger-winston');

passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) console.log(err);
            if (!user) {
                logWarn.warn(`Username ${username} not found`);
                return done(null, false);
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) console.log(err);
                if (!isMatch) {
                    logWarn.warn(`Password is not correct`);
                    return done(null, false);
                }
                return done(null, user);
            });
        })
    })
)

passport.serializeUser((user, done) => {
    return done(null, user._id);
})
passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    return done(null, user);
})

const authenticate = passport.authenticate('local', { failureRedirect: '/register' })

module.exports = {
    passport,
    authenticate,
}