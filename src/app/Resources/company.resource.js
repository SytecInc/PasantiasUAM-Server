const json = (data) => {
    return {
        id: data._id,
        nit: data.nit,
        company_name: data.company_name,
        email: data.email,
        contact_phone: data.contact_phone,
        active: data.active,
    };
}

const companyResource = (data) =>{
    return { data: json(data) };
}

const companyCollection = (data) => {
    return {
        data: data.map((elem) => json(elem)),
    };
}

module.exports = { companyResource, companyCollection };