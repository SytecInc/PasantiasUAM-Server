const { createAccessToken} = require("../services/auth/jwt");
const { comparePassword } = require("../services/auth/pwd");
const User = require("../models/user.model");

async function signIn(req, res) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    
    User.findOne({ email }, async (err, userStored) => {
        if (err) {
            res.status(500).send({ error: "Server cannot find user. Reason: "+err });
        } else {
            comparePassword(password, userStored.password)
            .then((check) => {
                if (!check) {
                    res.status(401).send({ error: "Invalid password." });
                } else {
                    if (!userStored.active) {
                        res.status(403).send({ error: "Inactive user." });
                    } else {
                        createAccessToken(userStored)
                        .then((accessToken) => {
                            res.status(200).send({
                                data: {
                                    accessToken: accessToken,
                                },
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({ error: "Server cannot create access token. Reason: "+err });
                        });
                    }
                }
            })
            .catch((err) => {
                res.status(500).send({ error: "Server cannot compare password. Reason: "+err });
            });
        }
    });
};

module.exports = {
    signIn,
};