const express = require("express");
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const email_validator = require('email-validator');

// MongoDB models
const Entries = require('../models/entry');
const User = require('../models/user');

router.get("/api", function (req, res) {
    res.json({ msg: 'This is the API!' });
});

router.get("/api/test", function (req, res) {
    Entries.find({ username: 'SolaceFZ' })
        .then((entry) => {
            res.json(entry);
        })
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

router.post('/api/test', function (req, res) {

});

function validate_registration(body) {
    let error_message = '';
    if (!body.username) {
        error_message += 'Username cannot be empty.'
    } else if (body.username.length < 7) {
        error_message += "Usernames must be at least 7 characters"
    }

    if (!email_validator.validate(req.body.email)) {
        error_message += `\nInvalid email address.`
    }
}

router.post('/api/register', function (req, res) {
    if (req.body) {
        if (req.body.username && email_validator.validate(req.body.email) && req.body.password && req.body.confirm_password &&
            req.body.password === req.body.confirm_password) {
            bcrypt.hash(req.body.password, 10, (err, password_hash) => {
                if (err) {
                    console.log(err);
                    res.send();
                } else {
                    User.create({ username: req.body.username, email: req.body.email, password: { hash: password_hash } })
                        .then((result) => {
                            res.status(200).json({ res: "OK" });
                        })
                        .catch((error) => {
                            // Dupe user
                            if (error.code == 11000) {
                                console.log(error)
                            }
                        })
                }
            });
        } else {
            if (!req.body.username) {

            } else if (!req.body.email) {

            } else if
        }
    }
});

module.exports = router;