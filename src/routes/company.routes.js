const express = require("express");
const CompanyController = require("../app/Controllers/company.controller");

const api = express.Router();

api.get("/companies", CompanyController.index);
api.get("/companies/:id", CompanyController.show);
api.post("/companies", CompanyController.store);
api.put("/companies/:id", CompanyController.update);
api.delete("/companies/:id", CompanyController.destroy);

module.exports = api;