const mongoose = require("mongoose");
const Address = require("./address.model");

const govIdTypes = {
    cc: "C.C.",
    ti: "T.I.",
    ce: "C.E.",
    pa: "Pasaporte",
}

const genders = {
    m: "Masculino",
    f: "Femenino",
    o: "Otro",
};

const ProfileSchema = mongoose.Schema({
    names: {
        type: String,
        require: true,
    },
    lastnames: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        enum: Object.values(genders),
        require: true,
    },
    birthdate: {
        type: Date,
        require: false,
    },
    birthplace: {
        type: String,
        require: false,
    },
    govIdType: {
        type: String,
        enum: Object.values(govIdTypes),
        require: true,
    },
    govId: {
        type: String,
        require: true,
    },
    govIdExpPlace: {
        type: String,
        require: false,
    },
    phone_number: {
        type: String,
        require: true,
    },
    home_phone_number: {
        type: String,
        require: false,
    },
    office_number: {
        type: String,
        require: false,
    },
    personal_email: {
        type: String,
        require: false,
    },
    rh: {
        type: String,
        require: false,
    },
    marital_status: {
        type: String,
        require: false,
    },
    eps: {
        type: String,
        require: false,
    },
    pension_fund: {
        type: String,
        require: false,
    },
    addresses: {
        type: [Address.schema],
        require: false,
    },
    picture: {
        type: String,
        require: false,
    },
}, {timestamps: true});

module.exports.govIdTypes = govIdTypes;
module.exports = mongoose.model("Profile", ProfileSchema);