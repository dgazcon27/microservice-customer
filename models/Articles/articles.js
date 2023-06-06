const TimeStampModel = require("../TimeStampModel")
const { parseDate } = require("../../utils/tools")

module.exports = class ArticleModel extends TimeStampModel {
    constructor(article) {
        super(article);
        this._id = article._id;
        this.description = article.description;
        this.name = article.name;
        this.type = article.type;
        this.expiredAt = parseDate(article.expiredAt);
        this.quantity = article.quantity;
        this.unitPrice = article.unitPrice;
    }
}