let mongoose = require("mongoose");

let entry_schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
});

let Entry = mongoose.model("Entry", entry_schema);

module.exports = Entry;