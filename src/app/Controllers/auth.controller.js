const jwt = require("../../services/jwt");
const moment = require("moment");
const bcrypt = require("bcrypt-nodejs");
const User = require("../Models/user.model");

const signIn = (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    User.findOne({ email }, (err, userStored) => {
        if (err) {
            res.status(500).send({ error: "Server cannot find user. Reason: "+err });
        } else {
            bcrypt.compare(password, userStored.password, (err, check) => {
                if (err) {
                    res.status(500).send({ error: "Server cannot perform password check. Reason: "+err });
                } else if (!check) {
                    res.status(406).send({ error: "Invalid password." });
                } else {
                    if (!userStored.active) {
                        res.status(200).send({ code:200, error: "Inactive user." });
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
        ? res.status(404).send({ error: "El token ha caducado" })
        :User.findOne({ _id: id }, (err, userStored) =>
            err
                ? res.status(500).send({ error: "Error del servidor" })
                : !userStored
                ? res.status(400).send({ error: "Usuario no encontrado" })
                : res
                    .status(200)
                    .send({
                        accessToken: jwt.createAccessWithToken(userStored),
                        refreshToken: refreshToken,
                    })
        );
};

module.exports = {signIn, refreshAccessToken};