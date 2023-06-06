const PurchaseRepository = require("../../models/Purchase/purchaseRepository")

module.exports = class PurchaseService {
    createPurchase(body) {
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
            .populate({path:'articles.article', select: 'name unitPrice'} )
            .populate({path:'client', select: 'name dni'} )
            console.log(purchases)
            resolve(purchases)
        })
    }
}
