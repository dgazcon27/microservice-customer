const PurchaseService = require('../../services/Purchase/services.purchase')
const PurchaseModel = require('../../models/Purchase/purchase')
const CustomerService = require("../../services/Customer/services.customer")
const ArticleService = require("../../services/Articles/services.articles")

const purchaseService = new PurchaseService();


const createPurchase = async (req, res, next) =>{
    const { body } = req
    try {
      const purchase = new PurchaseModel(await purchaseService.createPurchase(body))
      return res.status(200).json(purchase)
    } catch (error) {
      next(error)
    }
}

const getPurchases = async (req, res, next) => {
  
  try {
    const purchase = new PurchaseModel(await purchaseService.getPurchases())
    return res.status(200).json(purchase)
  } catch (error) {
    next(error)
  }
}

module.exports = {
    createPurchase,
    getPurchases
}