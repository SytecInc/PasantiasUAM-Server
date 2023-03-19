const { check, validationResult } = require("express-validator");
const User = require("../Models/user.model");

const validateProfileStore = [
    check("name", "name field is required").exists(),
    check("name", "name field must be a string").isString(),
    check("name", "name field cannot be empty").not().isEmpty(),

    check("lastname", "lastname field is required").exists(),
    check("lastname", "lastname field must be a string").isString(),
    check("lastname", "lastname field cannot be empty").not().isEmpty(),

    check("govId", "govId field is required").exists(),
    check("govId", "govId field must be a string").isString(),
    check("govId", "govId field must be only 10 characters").isLength({ min: 10, max: 10 }),
    check("govId", "govId field must be a number").isNumeric(),
    check("govId").custom((value, {req, loc, path}) => {
        return User.findOne({
            govId: req.body.govId,
        }).then(user => {
            if (user !== null) {
                return Promise.reject("govId is already registered ");
            }
        });
    }),

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

    check("phone", "phone field is required").exists(),
    check("phone", "phone field must be a string").isString(),
    check("phone", "phone field must be only 10 characters").isLength({ min: 10, max: 10 }),
    check("phone", "phone field must be a number").isNumeric(),
    check("phone").custom((value, {req, loc, path}) => {
        return User.findOne({
            phone: req.body.phone,
        }).then(user => {
            if (user !== null) {
                return Promise.reject('phone is already registered');
            }
        });
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

const validateProfileUpdate = [
    check("name", "name field must be a string").isString().optional(),
    check("name", "name field cannot be empty").not().isEmpty().optional(),

    check("lastname", "lastname field must be a string").isString().optional(),
    check("lastname", "lastname field cannot be empty").not().isEmpty().optional(),

    check("govId", "govId field must be a string").isString().optional(),
    check("govId", "govId field must be only 10 characters").isLength({ min: 10, max: 10 }).optional(),
    check("govId", "govId field must be a number").isNumeric().optional(),
    check("govId").custom((value, {req, loc, path}) => {
        return User.findOne({
            govId: req.body.govId,
        }).then(user => {
            if (user !== null) {
                return Promise.reject("govId is already registered ");
            }
        });
    }).optional(),
    
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

    check("phone", "phone field must be a string").isString().optional(),
    check("phone", "phone field must be only 10 characters").isLength({ min: 10, max: 10 }).optional(),
    check("phone", "phone field must be a number").isNumeric().optional(),
    check("phone").custom((value, {req, loc, path}) => {
        return User.findOne({
            phone: req.body.phone,
        }).then(user => {
            if (user !== null) {
                return Promise.reject('phone is already registered');
            }
        });
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
    validateProfileStore,
    validateProfileUpdate
};