const mongoose = require("mongoose");
const Profile = require("./profile.model");
const Student = require("./student.model");
const Meeting = require("./meeting.model");

const roles = {
	admin: "admin",
	student: "student"
}

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: Object.values(roles),
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
    },
    profile: {
        type: Profile.schema,
        require: false,
    },
    student: {
        type: Student.schema,
        require: false,
    },
    meetings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meeting'
    }]
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
module.exports.roles = roles;