const express = require("express");
const CompanyController = require("../controllers/company");

const api = express.Router();

api.post("/company/signup", CompanyController.signUp);

module.exports = api;