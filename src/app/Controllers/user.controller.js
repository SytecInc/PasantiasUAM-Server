const User = require("../Models/user.model");
const { userResource, userCollection } = require("../Resources/user.resource");
const authUser = require("../../middleware/user.auth").authUser;
const bcrypt = require("bcrypt-nodejs");

const saltRounds = 10;

async function index(req, res) {
    const params = req.query;
    const user = await authUser(req.headers.authorization);

    if (user.role === User.roles.admin) {
        if (params.active === 'TRUE') {
            User.find({ active: true }, (err, users) => {
                if (err) {
                    res.status(422).send({ error: "Cannot find users. Reason: "+err });
                } else {
                    res.status(200).send(userCollection(users));
                }
            });
        } else {
            User.find({}, (err, users) => {
                if (err) {
                    res.status(422).send({ error: "Cannot find users. Reason: "+err });
                } else {
                    res.status(200).send(userCollection(users));
                }
            });
        }
    } else {
        res.status(403).send({ error: "You are not authorized to get all users data." });
    }
}

async function show(req, res) {
    const params = req.params;
    const user = await authUser(req.headers.authorization);

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
}

async function store(req, res) {
    const { name, lastname, govId, email, phone, password } = req.body;
    const user = new User();
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.govId = govId;
    user.phone = phone;
    user.role = User.roles.student;
    user.active = true;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) {
                    res.status(500).send({ error: err });
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
    });
}

async function update(req, res) {
    const params = req.params;
    const user = await authUser(req.headers.authorization);

    if (params.id != user._id && user.role != User.roles.admin) {
        res.status(403).send({ error: "You are not authorized to update this user." });
    } else {
        var dict = {};
        if (req.body.name !== undefined) dict.name = req.body.name;
        if (req.body.lastname !== undefined) dict.lastname = req.body.lastname;
        if (req.body.email !== undefined) dict.email = req.body.email;
        if (req.body.govId !== undefined) dict.govId = req.body.govId;
        if (req.body.phone !== undefined) dict.phone = req.body.phone;
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
}

async function destroy(req, res) {
    const params = req.params;
    const user = await authUser(req.headers.authorization);

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
}

async function storeAdmin(req, res) {
    const { name, lastname, govId, email, phone, password } = req.body;
    const user = new User();
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.govId = govId;
    user.phone = phone;
    user.role = User.roles.admin;
    user.active = true;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            bcrypt.hash(password, salt, null, (err, hash) => {
                if (err) {
                    res.status(500).send({ error: err });
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
    });
}

async function uploadAvatar(req, res) {
    const params = req.params;
    const user = authUser(req.headers.authorization);

    if (params.id != user._id && user.role != User.roles.admin) {
        res.status(403).send({ error: "You don't have permission to do this." });
    } else {
        User.findById({ _id: params.id }, (err, userData) => {
            if (err) {
              res.status(500).send({ error: "Can't find user. Reason: "+err });
            } else {
              if (!userData) {
                res.status(404).send({ error: "User not found." });
              } else {
                let user = userData;
        
                if (req.files) {
                  let filePath = req.files.avatar.path;
                  console.log(filePath);
                  let fileSplit = filePath.split("/");
                  let fileName = fileSplit[2];
                  console.log(fileName);
                  let extSplit = fileName.split(".");
                  let fileExt = extSplit[1];
        
                  if (fileExt !== "png" && fileExt !== "jpg") {
                    res.status(400).send({
                      error:
                        "Invalid file extension. Only support png and jpg files.",
                    });
                  } else {
                    user.avatar = fileName;
                    User.findByIdAndUpdate(
                      { _id: params.id },
                      user,
                      (err, userResult) => {
                        if (err) {
                          res.status(500).send({ error: "Can't find user. Reason: "+err });
                        } else {
                          if (!userResult) {
                            res
                              .status(404)
                              .send({ error: "User not found." });
                          } else {
                            res.status(200).send({ avatarName: fileName });
                          }
                        }
                      }
                    );
                  }
                }
              }
            }
          });
    }
}

module.exports = { 
    store, 
    index, 
    show, 
    update, 
    destroy,
    storeAdmin,
    uploadAvatar
};