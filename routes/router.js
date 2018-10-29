const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const email_validator = require('email-validator');

// MongoDB models
const Entries = require('../models/entry');
const User = require('../models/user');

// Auth
const jwt = require('../config/jwt_auth');

// -------------------------------------------------------------------------

// Auth filter, kicks out any users that are not logged in when accessing secure pages
function auth(req, res, next) {
    let token = jwt.verify(req.headers.token);
    if (token.id) {
        console.log(token);
        req.owner = token.id;
    }
    next();
}

/**
 * API entry point. Greetings! :]
 */
router.get("/api", function (req, res) {
    res.json({ msg: 'This is the API! :]' });
});

/**
 * Grabs entries.
 */
router.get("/api/entries", auth, function (req, res) {
    if (!req.owner) {
        res.json([]);
    } else {
        Entries.find({ owner: req.owner })
            .then((entry) => {
                res.json(entry);
            });
    }
    // res.json([{
    //     entry_name: "AMD Sapphire Radeon RX 580 8GB Special Edition Graphics Card",
    //     cost: 189.99,
    //     date: "October 13, 2018",
    //     category: '',
    //     notes: 'Original price = 229.99, saved 15% using eBay coupon, used ~60 worth of eBay gift card.'
    // },
    // {
    //     entry_name: "Lillie (Full Art) - Ultra Prism",
    //     cost: 41.99,
    //     date: "September 18, 2019",
    //     category: '',
    //     notes: ''
    // }]);
});

/**
 * For posting to create a new entry
 */
router.post('/api/entries/new', auth, function (req, res) {
    if (!req.owner) {
        res.json({ msg: "You are not logged in." });
    } else {
        Entries.create({
            owner: req.owner,
            entry_name: req.entry_name,
            cost: req.cost,
            date: req.date,
            category: req.category,
            notes: req.notes
        }).then((entry) => {
            res.json(entry);
        });
    }
    //res.json({ msg: "Not yet implemented." });
});

/**
 * For posting to update an existing entry
 */
router.post('/api/entries/update', auth, function (req, res) {
    if (!req.owner) {
        res.json({ msg: "You are not logged in." });
    } else {
        Entries.updateOne({
            owner: req.owner,
            entry_name: req.entry_name,
            cost: req.cost,
            date: req.date,
            category: req.category,
            notes: req.notes
        }).then((entry) => {
            res.json(entry);
        });
    }
    //res.json({ msg: "Not yet implemented." });
});

/**
 * Helper for validating registration information.
 * @param {*} body 
 */
function validate_registration(body) {
    let error_message = '';

    // Username checks
    if (!body.username) {
        error_message += 'Username cannot be empty.\n'
    } else if (body.username.length < 7) {
        error_message += "Usernames should be at least 7 characters.\n"
    } else if (!body.username.match(/^(?=.{7,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g)) {
        error_message += "Allowed special characters in usernames are _ (underscore) and . (period) and should not begin or end with them.\n"
    }

    // Password checks
    if (!body.password || !body.confirm_password) {
        error_message += "Please fill out both password fields.\n";
    } else if (body.password != body.confirm_password) {
        error_message += "Passwords do not match.\n";
    } else if (body.password.length < 7) {
        error_message += "Please enter a password that's 7 characters or longer.\n";
    }

    // Email checks
    if (!email_validator.validate(body.email)) {
        error_message += "Invalid email address.";
    }

    return error_message;
}

/**
 * For registering new users.
 */
router.post('/api/register', function (req, res) {
    if (req.body) {
        let error_message = validate_registration(req.body);

        if (!error_message) {
            bcrypt.hash(req.body.password, 10, (err, password_hash) => {
                if (err) {
                    console.log(err);
                    res.json({ msg: "Something went wrong while generating password." });
                } else {
                    User.create({ username: req.body.username, email: req.body.email, password: { hash: password_hash } })
                        .then((result) => {
                            res.status(200).json({ msg: "User created." });
                        })
                        .catch((error) => {
                            // Dupe user
                            if (error.code == 11000) {
                                let offending_field = error.errmsg.match(/dup key: { : "(.+)" }/)[1];
                                let msg = `${email_validator.validate(offending_field) ? 'Email' : 'User'} ${offending_field} already in use.`;
                                res.json({ msg: msg });
                                console.log(`Duplicate user, offender: ${offending_field}`);
                            } else {
                                res.json({ msg: "Something went wrong." });
                                console.log(error);
                            }
                        })
                }
            });
        } else {
            res.json({ msg: error_message });
        }
    }
});

/**
 * For authenticating users and log in.
 */
router.post('/api/login', function (req, res) {
    // console.log('post attempted');
    if (req.body) {
        if (req.body.login && req.body.password) {
            let user_cred = {};

            // Input is email
            if (email_validator.validate(req.body.login)) {
                user_cred = { email: req.body.login }
            } else { // Input was username
                user_cred = { username: req.body.login };
            }

            User.findOne(user_cred)
                .then((result) => {
                    // console.log(result);

                    if (!result) {
                        res.json({ msg: "Invalid username or password." });
                    } else {
                        bcrypt.compare(req.body.password, result.password.hash).then((passwords_match) => {
                            if (passwords_match) {
                                // Generate JWT
                                let token = jwt.sign({ id: result._id });

                                res.json({ msg: "We are good. You are logged in.", token: token, success: true });
                                //res.json({ msg: "We are good. You are logged in." })
                            } else {
                                res.json({ msg: "Invalid username or password."});
                            }
                        });
                    }
                })
                .catch((error) => {
                    res.json({ msg: error.errmsg });
                });
        } else {
            res.json({ msg: "Please enter a username and a password." });
        }
    }
});

module.exports = router;