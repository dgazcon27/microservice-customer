const TimeStampModel = require("../TimeStampModel")

module.exports = class ArticleModel extends TimeStampModel {
    constructor(article) {
        super();
        this._id = article._id;
        this.description = article.description;
        this.name = article.name;
        this.type = article.type;
        this.expiredAt = article.expiredAt
    }
}