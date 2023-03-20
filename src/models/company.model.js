const mongoose = require("mongoose");
const Address = require("./address.model");
const Profile = require("./profile.model");
const Agreement = require("./agreement.model");

const CompanySchema = mongoose.Schema({
    nit: {
        type: String,
        unique: true,
    },
    comp_name: {
        type: String,
        require: true,
    }, 
    comp_email: {
        type: String,
        unique: true,
    },
    comp_phone_number: {
        type: String,
        require: true,
    },
    comp_address: {
        type: Address.schema,
        require: true,
    },
    legal_representative: {
        type: Profile.schema,
        require: true,
    },
    agreement: {
        type: Agreement.schema,
        require: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Company", CompanySchema);