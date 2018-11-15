let mongoose = require("mongoose");

let entry_schema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  entry_name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  notes: {
    type: String
  }
});

let Entry = mongoose.model("Entry", entry_schema);

module.exports = Entry;
