const { check, validationResult } = require("express-validator");
const User = require("../Models/user.model");

exports.validateUserSignInRequest = [

    check("email", "email field is required").exists(),
    check("email", "email field must be a string").isString(),
    check("email", "email field has no valid email.").isEmail(),
    check("email").custom((value, {req, loc, path}) => {
        return User.findOne({
            email: req.body.email,
        }).then(user => {
            if (user === null) {
                return Promise.reject("User not found");
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