const mongoose = require("mongoose");
const Career = require("./career.model");
const Resume = require("./resume.model");
const Internship = require("./internship.model");

const StudentSchema = mongoose.Schema({
    careers: {
        type: [Career.schema],
        require: false,
    },

    resume: {
        type: Resume.schema,
        require: false,
    },
    internships: {
        type: [Internship.schema],
        require: false,
    },
}, {timestamps: true});

module.exports = mongoose.model("Student", StudentSchema);