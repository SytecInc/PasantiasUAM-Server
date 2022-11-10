const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = "hola123";

exports.createAccessWithToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        createToken: moment().unix(),
        expiration_date: moment().add(12, "hours").unix(),
    };
    return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = (user) => {
    const payload = {
        id: user._id,
        expiration_date: moment().add(30, "days").unix(),
    };
    return jwt.encode(payload, SECRET_KEY);
};

exports.decodedToken = (token) => {
    return jwt.decode(token, SECRET_KEY, true);
};