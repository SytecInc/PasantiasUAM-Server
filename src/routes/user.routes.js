const express = require("express");
const multipart = require("connect-multiparty");
const UserController = require("../app/Controllers/user.controller");
const { 
        validateUserStoreRequest,
        validateUserUpdateRequest 
    } = require("../app/Requests/user.requests");
const middlewareAuth = require("../middleware/user.auth").ensureAuth;
const uploadAvatar = multipart({ uploadDir: "../../uploads/avatar" });

const api = express.Router();

api.get("/users", [middlewareAuth], UserController.index);
api.get("/users/:id", [middlewareAuth], UserController.show);
api.post("/users", validateUserStoreRequest, UserController.store);
api.post("/users/admin", UserController.storeAdmin);
api.put("/users/:id" , [middlewareAuth], validateUserUpdateRequest, UserController.update);
api.delete("/users/:id", [middlewareAuth], UserController.destroy);
api.put("/users/upload-avatar/:id", [middlewareAuth, uploadAvatar], UserController.uploadAvatar);

module.exports = api;