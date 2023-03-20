const mongoose = require('mongoose');
const Profile = require('./profile.model');
const Address = require('./address.model');
const Career = require('./career.model');

const relationshipsTypes = {
    father: 'Padre',
    mother: 'Madre',
    spouse: 'Conyuge',
};

const FamilyPersonSchema = mongoose.Schema({
    profile: {
        type: Profile.schema,
        require: true,
    },
    profession: {
        type: String,
        require: true,
    },
    relationship: {
        type: String,
        enum: Object.values(relationshipsTypes),
        require: true,
    },
}, {timestamps: true});

const SchoolSchema = mongoose.Schema({
    school_name: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    address: {
        type: Address.schema,
        require: true,
    },
    graduation_date: {
        type: Date,
        require: true,
    },
}, {timestamps: true});

const SeminarSchema = mongoose.Schema({
    seminar_name: {
        type: String,
        require: true,
    },
    short_description: {
        type: String,
        require: true,
    },
    seminar_start_date: {
        type: Date,
        require: true,
    },
    seminar_end_date: {
        type: Date,
        require: true,
    },
    address: {
        type: Address.schema,
        require: true,
    },
    institution: {
        type: String,
        require: true,
    },
}, {timestamps: true});

const EmploymentSchema = mongoose.Schema({
    company_name: {
        type: String,
        require: true,
    },
    company_address: {
        type: Address.schema,
        require: true,
    },
    position: {
        type: String,
        require: true,
    },
    job_start_date: {
        type: Date,
        require: true,
    },
    job_end_date: {
        type: Date,
        require: true,
    },
    job_description: {
        type: String,
        require: true,
    },
    superior_names: {
        type: String,
        require: true,
    },
    superior_position: {
        type: String,
        require: true,
    },
    company_phone_number: {
        type: String,
        require: true,
    },
}, {timestamps: true});

const LanguagesSchema = mongoose.Schema({
    language: {
        type: String,
        require: true,
    },
    reading: {
        type: Number,
        maximum: 100,
        minimum: 0,
        require: true,
    },
    writing: {
        type: Number,
        maximum: 100,
        minimum: 0,
        require: true,
    },
    speaking: {
        type: Number,
        maximum: 100,
        minimum: 0,
        require: true,
    },
    listening: {
        type: Number,
        maximum: 100,
        minimum: 0,
        require: true,
    },
}, {timestamps: true});

const ResumeSchema = mongoose.Schema({
    family: {
        type: [FamilyPersonSchema],
        require: true,
    },
    profile_description: {
        type: String,
        require: true,
    },
    secundary_school: {
        type: SchoolSchema,
        require: true,
    },
    higher_education: {
        type: [Career.schema],
        require: true,
    },
    seminars: {
        type: [SeminarSchema],
        require: true,
    },
    other_activities: {
        type: [SeminarSchema],
        require: true,
    },
    employments: {
        type: [EmploymentSchema],
        require: true,
    },
    languages: {
        type: [LanguagesSchema],
        require: true,
    },
    technical_skills: {
        type: [String],
        require: true,
    },
    hobbies: {
        type: [String],
        require: true,
    },
}, {timestamps: true});

module.exports.relationshipsTypes = relationshipsTypes;
module.exports = mongoose.model('FamilyPerson', FamilyPersonSchema);
module.exports = mongoose.model('School', SchoolSchema);
module.exports = mongoose.model('Seminar', SeminarSchema);
module.exports = mongoose.model('Employment', EmploymentSchema);
module.exports = mongoose.model('Languages', LanguagesSchema);
module.exports = mongoose.model('Resume', ResumeSchema);