let express = require("express");
let router = express.Router();

router.get("/", function(req, res) {
    res.json({msg: 'This is the homepage!'});
});

module.exports = router;