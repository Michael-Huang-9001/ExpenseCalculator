let mongoose = require("mongoose");
let bcrypt = require('bcrypt');

let user_schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    hash: {
      type: String,
      required: true
    }
    // nacl: {
    //   type: String,
    //   required: true
    // }
  }
});

let User = mongoose.model("User", user_schema);

module.exports = User;
