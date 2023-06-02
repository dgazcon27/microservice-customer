const Mongoose = require("mongoose");
const ArticleRepository = require("../Articles/articlesRepository");
const Customer = require("../Customer/customerRepository");

const PurchaseRepository = Mongoose.model('purchase', Mongoose.Schema({
    articles: [{type: ArticleRepository, required: true}],
    client: { type: Customer, required: true }
  }))
  
module.exports = PurchaseRepository;