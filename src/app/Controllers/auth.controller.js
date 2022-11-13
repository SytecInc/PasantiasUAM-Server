const jwt = require("../../services/jwt");
const moment = require("moment");
const bcrypt = require("bcrypt-nodejs");
const User = require("../Models/user.model");

const signIn = (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    User.findOne({ email }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Server cannot find user. Reason: "+err });
        } else {
            bcrypt.compare(password, userStored.password, (err, check) => {
                if (err) {
                    res.status(500).send({ message: "Server cannot perform password check. Reason: "+err });
                } else if (!check) {
                    res.status(406).send({ message: "Invalid password." });
                } else {
                    if (!userStored.active) {
                        res.status(200).send({ code:200, message: "Inactive user." });
                    } else {
                        res.status(200).send({
                            data: {
                                accessToken: jwt.createAccessWithToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored),
                            },
                        });
                    }
                }
            });
        }
    });
};

const checkIfTokenExpired = (token) => {
    const { expirationDate } = jwt.decodedToken(token);
    const currentDate = moment().unix();
    return currentDate > expirationDate ? true : false;
};

const refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;
    const tokenExpired = checkIfTokenExpired(refreshToken);
    console.log(tokenExpired);

    const { id } = jwt.decodedToken(refreshToken);

    tokenExpired
        ? res.status(404).send({ message: "El token ha caducado" })
        :User.findOne({ _id: id }, (err, userStored) =>
            err
                ? res.status(500).send({ message: "Error del servidor" })
                : !userStored
                ? res.status(400).send({ message: "Usuario no encontrado" })
                : res
                    .status(200)
                    .send({
                        accessToken: jwt.createAccessWithToken(userStored),
                        refreshToken: refreshToken,
                    })
        );
};

module.exports = {signIn, refreshAccessToken};