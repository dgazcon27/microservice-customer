const { parseDate } = require("../../utils/tools")

module.exports = class Customer {
    constructor(customer) {
        this._id = customer._id;
        this.dni = customer.dni;
        this.name = customer.name;
        this.birthday = parseDate(customer.birthday);
        this.experience = customer.experience ? parseExperience(customer.experience): [];
    }
}

function parseExperience(experience) {
    return experience.map(item => ({
        years: item.years,
        organizationName: item.organizationName
    }))
}