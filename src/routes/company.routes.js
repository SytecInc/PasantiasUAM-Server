const express = require("express");
const CompanyController = require("../app/Controllers/company.controller");

const api = express.Router();

api.post("/companies", CompanyController.store);

module.exports = api;