const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const path = require('path');

const mongoose = require("mongoose");
const db_configs = require("./config/db");

const router = require("./routes/router");

// App setup
let app = express();
app.use(helmet());
app.use(bodyparser.json());
app.use(router);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

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

if (false) {
  Entry.create({
    username: "SolaceFZ",
    entry_name: "AMD Sapphire Radeon RX 580 8GB Special Edition Graphics Card",
    cost: 189.99,
    date: "October 13, 2018",
    category: '',
    notes: 'Original price = 229.99, saved 15% using eBay coupon, used ~60 worth of eBay gift card.'

  }, function (err, created) {
    console.log(created);
  });

  Entry.create({
    username: "SolaceFZ",
    entry_name: "Lillie (Full Art) - Ultra Prism",
    cost: 41.99,
    date: "September 18, 2019",
    category: '',
    notes: ''

  }, function (err, created) {
    console.log(created);
  });
}

const port = process.env.port || 8000;

app.listen(port, function () {
  console.log(`App is running on ${port}`);
});

