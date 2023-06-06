const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const PurchaseRepository = Mongoose.model('purchase', Mongoose.Schema({
    articles: [{
      quantity: {type: Number, required: true, default: 0},
      article: {type: Schema.Types.ObjectId, required: true, ref: 'article'}
    }],
    type: { type: String, default: 'OUTCOME', required: true },
    price: { type: Number, required: true, min: [1, 'Must be at least 1, got {VALUE}'] },
    client: {type: Schema.Types.ObjectId, required: true, ref: 'customer'}
}))
  
module.exports = PurchaseRepository;