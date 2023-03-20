const mongoose = require("mongoose");
const Address = require("./address.model");

const meetingTypes = {
    indu: "Induccion",
    cap: "Capacitacion",
    ase: "Asesoria",
    otr: "Otro",
};

const MeetingSchema = mongoose.Schema({
    meeting_name: {
        type: String,
        require: true,
    },
    meetingType: {
        type: String,
        enum: Object.values(meetingTypes),
        require: true,
    },
    short_description: {
        type: String,
        require: true,
    },
    meeting_start_date: {
        type: Date,
        require: true,
    },
    meeting_end_date: {
        type: Date,
        require: true,
    },
    address: {
        type: Address.schema,
        require: true,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});

module.exports.meetingTypes = meetingTypes;
module.exports = mongoose.model('Meeting', MeetingSchema);