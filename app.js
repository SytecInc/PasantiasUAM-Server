const express = require("express");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./config");

const app = express();

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const companyRoutes = require("./src/routes/company.routes");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(`/api/${API_VERSION}`, companyRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;
