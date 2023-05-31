module.exports = class Customer {
    constructor(customer) {
        this._id = customer._id;
        this.dni = customer.dni;
        this.name = customer.name;
        this.birthday = parseDate(customer.birthday);
        this.experience = customer.experience ? parseExperience(customer.experience): [];
    }
}

function parseDate(date) {
    const extractDate = new Date(date)
    day =  extractDate.getDate() < 10 ? "0"+extractDate.getDate() : extractDate.getDate();
    month = extractDate.getMonth()+1 < 10 ? "0"+(extractDate.getMonth()+1) : extractDate.getMonth()+1;
    year = extractDate.getFullYear();

    return `${day}/${month}/${year}`
}

function parseExperience(experience) {
    return experience.map(item => ({
        years: item.years,
        organizationName: item.organizationName
    }))
}