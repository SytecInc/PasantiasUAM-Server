const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

api.post("/user/signup", UserController.signUp);
api.post("/user/signin", UserController.signIn);

module.exports = api;