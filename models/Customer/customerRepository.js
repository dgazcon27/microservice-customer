const Mongoose = require("mongoose");

const Customer = Mongoose.model('customer', Mongoose.Schema({
    dni: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: '', required: true },
    birthday: { type: Date, required: true },
    experience: [{ 
      years: { type: Number, default: 0, required: true },
      organizationName: { type: String, required: true }
    }]
  }))
  
module.exports = Customer;