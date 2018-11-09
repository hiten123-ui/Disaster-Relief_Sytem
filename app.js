let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let passport = require('passport');
let session = require('express-session');
let mongoose = require('mongoose');

let app = express();
let config = require('./config');
let loginRouter = require("./routes/login");
let dashboardRouter = require("./routes/dashboard");

mongoose.connect(
  config.mongooseConnection,
  {}
);

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.authSecret
}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/about", (req, res, next) => {
  res.render("about");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
