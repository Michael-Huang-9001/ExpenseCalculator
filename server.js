const express = require("express");
const bodyparser = require("body-parser");
const compression = require("compression");
const path = require("path");

const mongoose = require("mongoose");
// const db_configs;

const router = require("./routes/router");

// App setup
let app = express();
const is_production = app.get("env") == "production";

app.use(bodyparser.json());
app.use(router);

if (is_production) {
	const db_configs = require("./config/db_mlab");
	console.log("Production version.");
	app.disable("x-powered-by");
	app.use(compression());
	app.use(express.static(path.resolve(__dirname, "build")));
	app.get("*", function (req, res) {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
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
} else {
	const db_configs = require("./config/db");
	console.log("Development version.");
	app.get("*", function (req, res) {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
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
}

module.exports = app;
