const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");

const mongoose = require("mongoose");
const db_configs = require("./config/db");

const router = require("./routes/router");

// App setup
let app = express();
app.use(helmet());
app.use(bodyparser.json({ type: "application/*+json" }));
app.use(router);

// Database
mongoose.connect(
  db_configs.url,
  err => {
    if (err) {
      console.log("Failed to connect to database.");
    } else {
      console.log("Database connected.");
    }
  }
);

const Entry = require("./models/entry");

Entry.create({
  username: "SolaceFZ",
  content: {
    attr1: "Example1",
    attr2: "Example2"
  }
});

const port = process.env.port || 8000;

app.listen(port, function() {
  console.log(`App is running on ${port}`);
});

