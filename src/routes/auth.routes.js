const express = require("express");
const AuthController = require("../app/Controllers/auth.controller");
const { validateUserSignInRequest } = require("../app/Requests/auth.requests");
const api = express.Router();

api.post("/login", validateUserSignInRequest, AuthController.signIn);
api.post("/users/refresh-token", AuthController.refreshAccessToken);

module.exports = api;