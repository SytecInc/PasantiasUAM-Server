const Company = require("../models/company.model");
const { companyResource } = require("../resources/company.resource");

const index = (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) {
            res.status(422).send({ error: "Cannot find companies. Reason: "+err });
        } else {
            res.status(200).send(companyResource(companies));
        }
    });
}

const show = (req, res) => {
    const { id } = req.params;
    Company.findById(id, (err, company) => {
        if (err) {
            res.status(422).send({ error: "Cannot find Company." });
        } else {
            res.status(200).send(companyResource(company));
        }
    });
}

const store = (req, res) => {
    const { nit, company_name, email, contact_phone } = req.body;
    
    const company = new Company();
    company.nit = nit;
    company.company_name = company_name;
    company.email = email;
    company.contact_phone = contact_phone;
    company.active = true;

    company.save(function (err, companieStored) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(201).send(companyResource(companieStored));
        }
    });
}

const update = (req, res) => {
    const { id } = req.params;
    var dict = {};
    if (req.body.nit !== undefined) dict.nit = req.body.nit;
    if (req.body.company_name !== undefined) dict.company_name = req.body.company_name;
    if (req.body.email !== undefined) dict.email = req.body.email;
    if (req.body.contact_phone !== undefined) dict.contact_phone = req.body.contact_phone;
    if (req.body.active !== undefined) dict.active = req.body.active;
    
    Company.findByIdAndUpdate(id, dict, {new: true}, (err, company) => {
        if (err) {
            res.status(422).send({ error: "Cannot update Company. Reason: "+err });
        } else {
            res.status(200).send(companyResource(company));
        }
    });
}

const destroy = (req, res) => {
    const { id } = req.params;
    Company.findByIdAndDelete(id, (err, company) => {
        if (err) {
            res.status(422).send({ error: "Cannot delete Company. Reason: "+err });
        } else if (company === null) {
            res.status(404).send({ error: "Cannot find Company." });
        } else {
            res.status(200).send(companyResource(company));
        }
    });
}

module.exports = { store, index, show, update, destroy };