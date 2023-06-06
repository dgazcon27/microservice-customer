const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const PurchaseRepository = Mongoose.model('purchase', Mongoose.Schema({
    articles: [{
      quantity: {type: Number, required: true, default: 0},
      article: {type: Schema.Types.ObjectId, required: true, ref: 'article'}
    }],
    type: { type: String, default: 'OUTCOME', required: true },
    price: { type: Number, default: 0, required: true },
}))
  
module.exports = PurchaseRepository;