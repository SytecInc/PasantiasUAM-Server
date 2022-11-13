const express = require("express");
const UserController = require("../app/Controllers/user.controller");
const { 
        validateUserStoreRequest,
        validateUserUpdateRequest 
    } = require("../app/Requests/user.requests");

const api = express.Router();

api.get("/users", UserController.index);
api.get("/users/:id", UserController.show);
api.post("/users", validateUserStoreRequest, UserController.store);
api.put("/users/:id", validateUserUpdateRequest, UserController.update);
api.delete("/users/:id", UserController.destroy);

module.exports = api;