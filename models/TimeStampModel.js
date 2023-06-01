const { parseDate } = require("../utils/tools")

module.exports = class TimeStampModel { 
    constructor({createdAt, updatedAt}) {
        this.createdAt = createdAt ? parseDate(createdAt) : new Date();
        this.updatedAt = createdAt ? parseDate(updatedAt) : new Date();
    }
}