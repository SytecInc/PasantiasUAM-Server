const { check, validationResult } = require("express-validator");
const User = require("../models/user.model");

const validateUserStore = [
    check("email", "email field is required").exists(),
    check("email", "email field must be a string").isString(),
    check("email", "email field has no valid email.").isEmail(),
    check("email").custom((value, {req, loc, path}) => {
        return User.findOne({
            email: req.body.email,
        }).then(user => {
            if (user !== null) {
                return Promise.reject('email already in use');
            }
        });
    }),
    check("email").custom((value, {req, loc, path}) => {
        if (/autonoma.edu.co/.test(req.body.email)) {
            return true;
        } else {
            throw new Error("email field is not an autonoma.edu.co domain")
        }
    }),

    check("password", "password field is required").exists(),
    check("password", "password field must be a string").isString(),
    check("password", "password field needs 6 or more characters").isLength({ min: 6 }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
    
];

const validateUserUpdate = [
    check("email", "email field must be a string").isString().optional(),
    check("email", "email field has no valid email.").isEmail().optional(),
    check("email").custom((value, {req, loc, path}) => {
        return User.findOne({
            email: req.body.email,
        }).then(user => {
            if (user !== null) {
                return Promise.reject('email already in use');
            }
        });
    }).optional(),
    check("email").custom((value, {req, loc, path}) => {
        if (/autonoma.edu.co/.test(req.body.email)) {
            return true;
        } else {
            throw new Error("email field is not an autonoma.edu.co domain")
        }
    }).optional(),

    check("password", "password field must be a string").isString().optional(),
    check("password", "password field needs 6 or more characters").isLength({ min: 6 }).optional(),

    check("role", "role field must be a string").isString().optional(),
    check("role", "role field cannot be empty").not().isEmpty().optional(),
    check("role", "role field must be a valid role").isIn(User.roles).optional(),

    check("active", "active field must be a boolean").isBoolean().optional(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
    
];

module.exports = {
    validateUserStore,
    validateUserUpdate
}