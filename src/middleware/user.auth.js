const { decodeToken } = require("../services/auth/jwt");
const User = require("../models/user.model");

async function ensureAuth(req, res, next) {
  if (!req.headers.authorization) { 
    res.status(401).send({ error: "Unauthenticated" });
  } else {
    const token = req.headers.authorization.replace(/['"]+/g, "");
    decodeToken(token)
    .then((payload) => {
      User.findOne({ _id: payload.id })
      .then((user) => {
        if (user.active === false) {
          res.status(403).send({ 
            user: {
                active : user.active
            }
          });
        } else {
          req.user = payload;
          next();
        }
      })
      .catch((err) => {
        res.status(401).send({ error: "User does not exist." });
      });
    })
    .catch((err) => {
      res.status(401).send({ error: "Expired or Invalid token" });
    })
  }
};

async function getAuthenticatedUser(token) {
  return new Promise((resolve, reject) => {
    decodeToken(token)
    .then((payload) => {
      User.findOne({ _id: payload.id })
      .then(
        (user) => {
          return resolve(user);
        }
      )
      .catch((err) => {
        new Error(err);
      });
    })
    .catch((err) => {
      new Error(err);
    });
  });
};

module.exports = {
  ensureAuth,
  getAuthenticatedUser
};