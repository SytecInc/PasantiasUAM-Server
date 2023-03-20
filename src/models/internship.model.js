const mongoose = require("mongoose");
const Profile = require("./profile.model");
const Company = require("./company.model");

const internshipModes = {
    virtual: "Virtual",
    in_person: "Presencial",
    mixed: "Mixto",
};

const internshipTypes = {
    pas: "Pasantia",
    emp: "Empresarial",
    hosp: "Hospitalaria",
};

const semesters = {
    first: "Primer semestre",
    inter: "Intersemestral",
    second: "Segundo semestre",
};

const arlLiableOptions = {
    comp: "Empresa",
    uni: "Universidad",
};

const InternshipSchema = mongoose.Schema({
    intern_company: {
        type: Company.schema,
        require: true,
    },
    intern_superior: {
        superior_profile: {
            type: Profile.schema,
            require: true,
        },
        superior_position: {
            type: String,
            require: true,
        },
    },
    intern_coordinator: {
        type: Profile.schema,
        require: true,
    },
    intern_schedule: {
        type: String,
        require: true,
    },
    intern_semester: {
        type: String,
        enum: Object.values(semesters),
        require: true,
    },
    intern_start_date: {
        type: Date,
        require: true,
    },
    intern_end_date: {
        type: Date,
        require: true,
    },
    intern_mode: {
        type: String,
        enum: Object.values(internshipModes),
        require: true,
    },
    intern_salary: {
        salary_amount: {
            type: Number,
            require: true,
        },
        salary_currency: {
            type: String,
            require: true,
        },
        salary_nature: {
            type: String,
            require: true,
        },
    },
    intern_type: {
        type: String,
        enum: Object.values(internshipTypes),
        require: true,
    },
    arl: {
        arl_name: {
            type: String,
            require: true,
        },
        arl_liable: {
            type: String,
            enum: Object.values(arlLiableOptions),
            require: true,
        }
    },
    main_objective: {
        type: String,
        require: true,
    },
    objectives_enum: {
        type: [String],
        require: true,
    },
    competences_enum: {
        type: [String],
        require: true,
    },
    norms_enum: {
        type: [String],
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
    },
}, {timestamps: true});

module.exports.internshipModes = internshipModes;
module.exports.internshipTypes = internshipTypes;
module.exports.semesters = semesters;
module.exports.arlLiableOptions = arlLiableOptions;
module.exports = mongoose.model("Internship", InternshipSchema);