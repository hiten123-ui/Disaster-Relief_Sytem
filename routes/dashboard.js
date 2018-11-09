let express = require("express");
let router = express.Router();
let usersModel = require("../models/users");
let config = require("../config");

router.use((req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  res.renderState = (state, data) => {
    res.render(state, {
      user: req.user,
      apiKey: config.google.apiKey,
      ...data
    });
  };
  next();
});

router.post("/update-details", (req, res, next) => {
  usersModel.update({
    email: req.user.email
  }, {
    $set: {
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      postal: req.body.postal
    }
  }, (err) => {
    if(err) {
      return console.log(err);
    }
    return res.send("Updated");
  });
});

router.use((req, res, next) => {
  if (!req.user.phone) {
    return res.renderState("details-form");
  }
  next();
});

router.get("/update-details", (req, res, next) => {
  return res.renderState("details-form");
});

router.get("/provide-help", (req, res, next) => {
  return res.renderState("provide-help");
});

router.get("/seek-help", (req, res, next) => {
  return res.renderState("seek-help");
});

router.get("/logout", (req, res, next) => {
  req.logout();
  return res.redirect("/");
});

router.get("/", (req, res, next) => {
  res.renderState("dashboard");
})

module.exports = router;