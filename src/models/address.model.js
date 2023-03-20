const mongoose = require("mongoose");

const addrLabel = {
    home: "Casa",
    work: "Trabajo",
    procd: "Procedencia",
    empr: "Empresa",
    uni: "Universidad",
};

const AddressSchema = mongoose.Schema({
    addr_label: {
        type: String,
        enum: Object.values(addrLabel),
        require: false,
    },
    address: {
        type: String,
        require: true,
    },
    addr_city: {
        type: String,
        require: true,
    },
    addr_state: {
        type: String,
        require: true,
    },
    addr_country: {
        type: String,
        require: true,
    },
    addr_postal_code: {
        type: String,
        require: false,
    },
    addr_phone_number: {
        type: String,
        require: false,
    },
}, {timestamps: true});

module.exports.addrLabel = addrLabel;
module.exports = mongoose.model("Address", AddressSchema);