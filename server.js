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
	{ useNewUrlParser: true },
	err => {
		if (err) {
			console.log("Failed to connect to database.");
		} else {
			console.log("Database connected.");
		}
	}
);

module.exports = app;