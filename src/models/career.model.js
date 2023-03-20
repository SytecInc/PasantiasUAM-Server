const mongoose = require("mongoose");

const classModes = {
    virtual: "Virtual",
    in_person: "Presencial",
    mixed: "Mixto",
};

const CareerSchema = mongoose.Schema({
    carr_intership: {
        type: Boolean,
        require: true,
    },
    snies: {
        type: String,
        unique: false,
    },
    carr_name: {
        type: String,
        require: true,
    },
    formation_level: {
        type: String,
        require: true,
    },
    class_mode: {
        type: String,
        enum: Object.values(classModes),
        require: true,
    },
    university_name: {
        type: String,
        require: true,
    },
}, {timestamps: true});

module.exports.classModes = classModes;
module.exports = mongoose.model("Career", CareerSchema);