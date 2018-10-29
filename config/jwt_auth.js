const fs = require('fs');
const jwt = require('jsonwebtoken');

const private_key = fs.readFileSync(__dirname + '/private.key');
const public_key = fs.readFileSync(__dirname + '/public.key');

// readFileSync needs an absolute path so __dirname is needed.

function sign(payload) {
    return jwt.sign(payload, private_key, { algorithm: "RS256", expiresIn: 60 * 60 * 24 }); // 24 hours
}

function verify(token) {
    return jwt.verify(token, public_key, function (err, decoded) {
        if (err) {
            console.log(err.message);
            return {error: err.message};
        }
        return decoded;
    });
}

module.exports = {
    sign: sign,
    verify, verify
}