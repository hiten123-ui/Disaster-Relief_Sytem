let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let config = require("./config");
let usersModel = require("./models/users");

let google = new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callback
    }, (accessToken, refreshToken, profile, done) => {
        let email = profile.emails[0].value;
        usersModel.findOne({email: email}, (err, user) => {
            if(err) {
                console.log(err);
                throw err;
            }
            if(!user) {
                usersModel.create({name: profile.displayName, email: email}, (err) => {
                    done(null, email);
                });
            } else {
                done(null, email);
            }
        });
});

module.exports = {
    google
};
