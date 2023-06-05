const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PurchaseRepository = Mongoose.model('purchase', Mongoose.Schema({
    articles: [{
      quantity: { type: Number, default: 0, required: true },
      article: {type: Schema.Types.ObjectId, required: true, ref: 'article'}
    }],
}))
  
module.exports = PurchaseRepository;