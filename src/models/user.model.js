const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     require: true,
    // },
    // lastname: {
    //     type: String,
    //     require: true,
    // },
    // govId: {
    //     type: String,
    //     require: true,
    // },
    email: {
        type: String,
        unique: true,
    },
    // phone: {
    //     type: String,
    //     require: true,
    // },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
    },
    // avatar: {
    //     type: String,
    //     require: false,
    // },
});

module.exports = mongoose.model("User", UserSchema);