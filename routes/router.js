let express = require("express");
let router = express.Router();
let path = require('path');

router.get("/api", function (req, res) {
    res.json({ msg: 'This is the API!' });
});

router.get("/api/test", function (req, res) {
    res.json([{
        entry_name: "Sapphire RX 580 8GB Special Edition",
        cost: 189.99,
        date: new Date().toLocaleDateString(),
        notes: ''
    },
    {
        entry_name: "Lillie (Full Art) - Ultra Prism",
        cost: 41.99,
        date: "2018-09-18",
        notes: ''
    }]);
});

module.exports = router;