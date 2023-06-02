const TimeStampModel = require("../TimeStampModel")

module.exports = class PurchaseModel extends TimeStampModel {
    constructor(purchase) {
        super(purchase)
        this._id = purchase._id;
        this.client = purchase.client
        this.articles = purchase.articles
    }
}