const { resource } = require("./resource");

const companyResource = (data) => {
    return resource(data, (data) => {
        return {
            id: data._id,
            nit: data.nit,
            company_name: data.company_name,
            email: data.email,
            contact_phone: data.contact_phone,
            active: data.active,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    });
}

module.exports = { companyResource };