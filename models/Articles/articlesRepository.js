const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const ArticleRepository = Mongoose.model('article', Mongoose.Schema({
    name: { type: String, default: '', required: true, index: true },
    image: { type: String, default: '', required: true, index: true },
    description: { type: String, default: ''},
    expiredAt: { type: Date, required: true },
    type: { type: String, default: ''},
    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, default: new Date(), required: true },
    quantityAvailable: { type: Number, default: 0, required: true },
    unitPrice: { type: Number, default: 0, required: true },
    createdBy: {type: Schema.Types.ObjectId, required: true, ref: 'customer'},
  }))
  
module.exports = ArticleRepository;