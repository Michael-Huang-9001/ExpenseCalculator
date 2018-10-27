const fs = require('fs');
const jwt = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
let private_key = fs.readFileSync(__dirname + '/private.key');
//let public_key = fs.readFileSync('./config/public.key', 'utf8');

// readFileSync needs an absolute path so __dirname is needed.

function sign(payload) {
    return jwt.sign(payload, private_key, { algorithm: "RS256" });
}

module.exports = {
    sign: sign
}