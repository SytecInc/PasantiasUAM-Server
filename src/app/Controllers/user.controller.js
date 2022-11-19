const bcrypt = require("bcrypt-nodejs");
const User = require("../Models/user.model");
const { userResource, userCollection } = require("../Resources/user.resource");

const index = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(422).send({ error: "Cannot find users. Reason: "+err });
        } else {
            res.status(200).send(userCollection(users));
        }
    });
}

const show = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err) {
            res.status(422).send({ error: "Cannot find user." });
        } else {
            res.status(200).send(userResource(user));
        }
    });
}

const store = (req, res) => {
    const { name, lastname, govId, email, phone, password } = req.body;
    const user = new User();
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.govId = govId;
    user.phone = phone;
    user.role = User.roles.student;
    user.active = true;

    bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
            res
            .status(500)
            .send({ error: "Cannot encrypt password. Reason: "+err });
        } else {
            user.password = hash;
            user.save(function (err, userStored) {
                if (err) {
                    res.status(500).send({ error: err });
                } else {
                    res.status(201).send(userResource(userStored));
                }
            });
        }
    });
}

const update = (req, res) => {
    const { id } = req.params;
    var dict = {};
    if (req.body.name !== undefined) dict.name = req.body.name;
    if (req.body.lastname !== undefined) dict.lastname = req.body.lastname;
    if (req.body.email !== undefined) dict.email = req.body.email;
    if (req.body.govId !== undefined) dict.govId = req.body.govId;
    if (req.body.phone !== undefined) dict.phone = req.body.phone;
    if (req.body.password !== undefined) dict.password = req.body.password;
    if (req.body.role !== undefined) dict.role = req.body.role;
    if (req.body.active !== undefined) dict.active = req.body.active;
    if (req.body.avatar !== undefined) dict.avatar = req.body.avatar;
    
    User.findByIdAndUpdate(id, dict, {new: true}, (err, user) => {
        if (err) {
            res.status(422).send({ error: "Cannot update user. Reason: "+err });
        } else {
            res.status(200).send(userResource(user));
        }
    });
}

const destroy = (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id, (err, user) => {
        if (err) {
            res.status(422).send({ error: "Cannot delete user. Reason: "+err });
        } else if (user === null) {
            res.status(404).send({ error: "Cannot find user." });
        } else {
            res.status(200).send(userResource(user));
        }
    });
}

module.exports = { store, index, show, update, destroy };