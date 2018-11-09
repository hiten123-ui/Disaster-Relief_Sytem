let express = require("express");
let router = express.Router();
let passport = require("passport");
let strategies = require("../strategies");
let usersModel = require("../models/users");

passport.serializeUser(function (email, done) {
    done(null, email);
});

passport.deserializeUser(function (email, done) {
    usersModel.findOne({email: email}, (err, user) => {
        if(err)
           return done(err);
        done(null, user);
    });
});

passport.use(strategies.google);

/* Google OAuth Routes */
router.get("/google", passport.authenticate("google", {
    scope: ['profile', 'email']
}));

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login/google"
}), (req, res, next) => {
    return res.redirect("/dashboard");
});

router.get("/", (req, res, next) => {
    res.render("login");
});

module.exports = router;