const express = require("express");
const {
    index,
    show,
    store,
    update,
    destroy,
} = require("../controllers/user.controller");
const { 
    validateUserStore,
    validateUserUpdate 
} = require("../validators/user.validator");
const { ensureAuth }  = require("../middleware/user.auth");

const api = express.Router();

api.get("/users", [ensureAuth], index);
api.get("/users/:id", [ensureAuth], show);
api.post("/users", validateUserStore, store);
api.put("/users/:id" , [ensureAuth], validateUserUpdate, update);
api.delete("/users/:id", [ensureAuth], destroy);

module.exports = api;