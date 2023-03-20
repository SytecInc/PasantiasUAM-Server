const User = require("../models/user.model");
const { userResource } = require("../resources/user.resource");
const { getAuthenticatedUser } = require("../middleware/user.auth");
const { hashPassword } = require("../services/auth/pwd");

async function index(req, res) {
    const params = req.query;
    getAuthenticatedUser(req.headers.authorization)
    .then((user) => {
        if (user.role === User.roles.admin) {
            if (params.active === 'TRUE') {
                User.find({ active: true }, (err, users) => {
                    if (err) {
                        res.status(422).send({ error: "Cannot find users. Reason: "+err });
                    } else {
                        res.status(200).send(userResource(users));
                    }
                });
            } else {
                User.find({}, (err, users) => {
                    if (err) {
                        res.status(422).send({ error: "Cannot find users. Reason: "+err });
                    } else {
                        res.status(200).send(userResource(users));
                    }
                });
            }
        } else {
            res.status(403).send({ error: "You are not authorized to get all users data." });
        }
    })
    .catch((err) => {
        res.status(500).send({ error: "Cannot get authenticated user: "+err });
    });
}

async function show(req, res) {
    const params = req.params;
    getAuthenticatedUser(req.headers.authorization)
    .then((user) => {
        if (params.id != user._id && user.role != User.roles.admin) {
            res.status(403).send({ error: "You are not authorized to get this user data." });
        } else {
            User.findById(params.id, (err, user) => {
                if (err) {
                    res.status(422).send({ error: "Cannot find user." });
                } else {
                    res.status(200).send(userResource(user));
                }
            });
        }
    })
    .catch((err) => {
        res.status(500).send({ error: "Cannot get authenticated user: "+err });
    });
}

async function store(req, res) {
    const { email, password } = req.body;
    const user = new User();
    user.email = email;
    user.role = User.roles.admin;
    user.active = true;
    hashPassword(password)
    .then((hash) => {
        user.password = hash;
        user.save(function (err, userStored) {
            if (err) {
                res.status(500).send({ error: err });
            } else {
                res.status(201).send(userResource(userStored));
            }
        });
    })
    .catch((err) => {
        res.status(500).send({ error: "Server cannot hash password. Reason: "+err });
    });
}

async function update(req, res) {
    const params = req.params;
    getAuthenticatedUser(req.headers.authorization)
    .then((user) => {
        if (params.id != user._id && user.role != User.roles.admin) {
            res.status(403).send({ error: "You are not authorized to update this user." });
        } else {
            var dict = {};
            if (req.body.email !== undefined) dict.email = req.body.email;
            if (req.body.password !== undefined) dict.password = req.body.password;
            if (req.body.role !== undefined && user.role === User.roles.admin) dict.role = req.body.role;
            if (req.body.active !== undefined && user.role === User.roles.admin) dict.active = req.body.active;
            
            User.findByIdAndUpdate(params.id, dict, {new: true}, (err, user) => {
                if (err) {
                    res.status(422).send({ error: "Cannot update user. Reason: "+err });
                } else {
                    res.status(200).send(userResource(user));
                }
            });
        }
    })
    .catch((err) => {
        res.status(500).send({ error: "Cannot get authenticated user: "+err });
    });

    
}

async function destroy(req, res) {
    const params = req.params;
    getAuthenticatedUser(req.headers.authorization)
    .then((user) => {
        if(user.role === User.roles.admin) {
            User.findByIdAndDelete(params.id, (err, user) => {
                if (err) {
                    res.status(422).send({ error: "Cannot delete user. Reason: "+err });
                } else if (user === null) {
                    res.status(404).send({ error: "Cannot find user." });
                } else {
                    res.status(200).send(userResource(user));
                }
            });
        } else {
            res.status(403).send({ error: "Only admin role can delete users." });
        }
    })
    .catch((err) => {
        res.status(500).send({ error: "Cannot get authenticated user: "+err });
    });
}

module.exports = { 
    store, 
    index, 
    show, 
    update, 
    destroy,
};