let express = require("express");
let router = express.Router();
let path = require('path');
let entries = require('../models/entry');

router.get("/api", function (req, res) {
    res.json({ msg: 'This is the API!' });
});

router.get("/api/test", function (req, res) {
    entries.find({ username: 'SolaceFZ' })
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

module.exports = router;