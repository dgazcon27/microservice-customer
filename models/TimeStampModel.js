module.exports = class TimeStampModel { 
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date()
    }

    setUpdatedAt(date) {
        this.updatedAt = date;
    }
}