const Mongoose = require("mongoose");

const ArticleRepository = Mongoose.model('article', Mongoose.Schema({
    name: { type: String, default: '', required: true, index: true },
    description: { type: String, default: ''},
    expiredAt: { type: Date, required: true },
    type: { type: String, default: ''},
    createdAt: { type: Date, default: new Date(), required: true },
    updatedAt: { type: Date, default: new Date(), required: true },
    quantityAvailable: { type: Number, default: 0, required: true },
    unitPrice: { type: Number, default: 0, required: true },
    packageUnit: { type: Number, default: 0, required: true },
    totalCost: { type: Number, default: 0, required: true },
    profit: { type: Number, default: 0, required: true }
  }))
  
module.exports = ArticleRepository;