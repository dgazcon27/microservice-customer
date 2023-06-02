const PurchaseRepository = require("../../models/Purchase/purchaseRepository")

module.exports = class CustomerService {
    createPurchase(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const purchase = await new PurchaseRepository(body).save();
                resolve(purchase);
            } catch (err) {
                reject(err)
            }
        }) 
    }
}
