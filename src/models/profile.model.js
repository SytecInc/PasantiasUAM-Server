const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    govId: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require: false,
    },
});

module.exports = mongoose.model("Profile", ProfileSchema);