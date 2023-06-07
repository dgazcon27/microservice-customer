const { parseDate } = require("../utils/tools")

module.exports = class TimeStampModel { 
    constructor({createdAt, updatedAt}) {
        this.createdAt = createdAt ? parseDate(createdAt) : parseDate(new Date());
        this.updatedAt = createdAt ? parseDate(updatedAt) : parseDate(new Date());
    }
}