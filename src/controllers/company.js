const bcrypt = require("bcrypt-nodejs");
const Company = require("../models/company");

function signUp(req, res) {
    const company = new Company();
    const { nit, company_name, email, contact_phone, password, repeatPassword } = req.body;
    company.nit = nit;
    company.company_name = company_name;
    company.email = email;
    company.contact_phone = contact_phone;
    company.active = true;

    if (!password || !repeatPassword) {
        res.status(404).send({ message: "Las contraseñas son obligatorias." });
    } else {
        if (password !== repeatPassword) {
            res.status(404).send({ message: "Las contraseñas no coinciden." });
        } else {
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    res
                    .status(500)
                    .send({ message: "Error al encriptar la contraseña." });
                } else {
                    company.password = hash;
                    company.save(function (err, companyStored) {
                        if (err) {
                            res.status(500).send({ message: "La empresa ya existe." });
                        } else {
                            if (!companyStored) {
                                res.status(404).send({ message: "Error al crear la empresa." });
                            } else {
                                res.status(200).send({ company: companyStored });
                            }
                        }
                    });
                }
            });
        }
    }
}
module.exports = { signUp };