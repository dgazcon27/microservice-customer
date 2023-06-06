const PurchaseRepository = require("../../models/Purchase/purchaseRepository")

module.exports = class PurchaseService {
    createPurchase(body, articles) {
        // console.log("Body purchase create", body)
        return new Promise(async (resolve, reject) => {
            try {
                //buscar todos los id que se enviaron de articles
                const purchase = await new PurchaseRepository(body).save();
                resolve(purchase);
                //resolve({})
            } catch (err) {
                reject(err)
            }
        }) 
    }

    getPurchases() {
        return new Promise(async (resolve, reject) => {
            const purchases = await PurchaseRepository.find({})
            .populate('articles.article')
            console.log(purchases)
            resolve(purchases)
        })
    }
}
