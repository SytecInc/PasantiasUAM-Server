const jwt = require("jwt-simple");
const moment = require("moment");
const User = require("../app/Models/user.model");
const SECRET_KEY = require("../../config").SECRET_KEY;

async function ensureAuth(req, res, next) {
  if (!req.headers.authorization)
    res.status(401).send({ error: "Unauthenticated" });
  /* Cambia el token a vacío /['"]+/g,"" */
  const token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    /* Si no se pasa como segundo parametro en el decode el 
        SECRET_KEY, no decodifica el token */
    var payload = jwt.decode(token, SECRET_KEY);
    /* payload es el token q se va a devolver, no se puede declarar
    como const o let, debe ser var */
    if (payload.expiration_date <= moment.unix())
      res.status(401).send({ error: "Expired token" });
    else {
      user = await User.findOne({ _id: payload.id });
      if (user === null) {
        return res.status(401).send({ error: "Failed to authenticate user that does not exist." });
      } else {
        if (user.active === false) {
          return res.status(403).send({ 
              error: "Your user is not active.",
              user: {
                  active : user.active
              }});
        }
      }
    }
  } catch (error) {
    return res.status(422).send({ error: "Invalid token" });
  }
  req.user = payload;
  next();
};

async function authUser(token) {
  const userInfo = jwt.decode(token, SECRET_KEY);
  user = User.findOne({ _id: userInfo.id });
  if (user === null) {
    return null;
  } else {
    return user;
  }
};

module.exports = {
  ensureAuth,
  authUser
};