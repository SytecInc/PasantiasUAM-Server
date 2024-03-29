const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../../../config").SECRET_KEY;

const createAccessToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn: "10h" }, (err, token) => {
            if (err) {
                new Error(err);
            } else {
                resolve(token);
            }
        });
    });
};

const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

module.exports = {
    createAccessToken,
    decodeToken,
};