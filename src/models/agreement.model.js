const mongoose = require('mongoose');
const Career = require('./career.model');

const agreementTypes = {
    pas: "Pasantia",
    sena: "SENA",
    marc: "Marco"
};

const AgreementSchema = mongoose.Schema({
    agrr_type: {
        type: String,
        enum: Object.values(agreementTypes),
        require: true,
    },
    agrr_start_date: {
        type: Date,
        require: true,
    },
    agrr_end_date: {
        type: Date,
        require: true,
    },
    careers: {
        type: [Career.schema],
        require: true,
    },
}, {timestamps: true});

module.exports.agreementTypes = agreementTypes;
module.exports = mongoose.model('Agreement', AgreementSchema);