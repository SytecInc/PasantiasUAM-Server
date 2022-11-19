const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = require("../../config").SECRET_KEY;

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization)
    res.status(401).send({ error: "Unauthenticated" });
  /* Cambia el token a vacío /['"]+/g,"" */
  const token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    /* Si no se pasa como segundo parametro en el decode el 
        SECRET_KEY, no decodifica el token */
    console.log("token ", token);
    var payload = jwt.decode(token, SECRET_KEY);
    /* payload es el token q se va a devolver, no se puede declarar
    como const o let, debe ser var */
    if (payload.expiration_date <= moment.unix())
      res.status(401).send({ error: "Expired token" });
  } catch (error) {
    return res.status(422).send({ error: "Invalid token" });
  }
  req.user = payload;
  next();
};