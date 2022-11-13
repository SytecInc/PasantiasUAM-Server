const json = (data) => {
    return {
        id: data._id,
        name: data.name,
        lastname: data.lastname,
        govId: data.govId,
        email: data.email,
        phone: data.phone,
        role: data.role,
        active: data.active,
        avatar: data.avatar,
    };
}

const userResource = (data) =>{
    return { data: json(data) };
}

const userCollection = (data) => {
    return {
        data: data.map((elem) => json(elem)),
    };
}

module.exports = { userResource, userCollection };