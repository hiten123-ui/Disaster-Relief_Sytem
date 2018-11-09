let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usersSchems = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  phone: Number,
  address: String,
  postal: Number,
  city: String,
  country: String,
  
});

let model = mongoose.model("users", usersSchems);

module.exports = model;
