const mongoose = require("mongoose");
const CompanySchema = mongoose.Schema({
    nit: {
        type: String,
        unique: true,
    },
    company_name: {
        type: String,
        require: true,
    }, 
    email: {
        type: String,
        unique: true,
    },
    contact_phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
    },
});

module.exports = mongoose.model("Company", CompanySchema);