module.exports = class Customer {
    constructor(customer) {
        this.dni = customer.dni;
        this.name = customer.name;
        this.birthday = parseDate(customer.birthday);
        this.experience = parseExperience(customer.experience);
    }
}

function parseDate(date) {
    day =  date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
    month = date.getMonth()+1 < 10 ? 0+(date.getMonth()+1) : date.getMonth()+1;
    year = date.getFullYear();

    return `${day}/${month}/${year}`
}

function parseExperience(experience) {
    return experience.map(item => ({
        years: item.years,
        organizationName: item.organizationName
    }))
}