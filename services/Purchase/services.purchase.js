const PurchaseRepository = require("../../models/Purchase/purchaseRepository")

module.exports = class CustomerService {
    createPurchase(body) {
        console.log(body)
        return new Promise(async (resolve, reject) => {
            try {
                //buscar todos los id que se enviaron de articles
                const purchase = await new PurchaseRepository(body).save();
                resolve(purchase);
                // resolve({})
            } catch (err) {
                reject(err)
            }
        }) 
    }

    getPurchases() {
        return new Promise(async (resolve, reject) => {
            const purchases = await PurchaseRepository.find({})
            .populate({
                strictPopulate: false,
                path: 'article',
                select:'name',
                populate: {
                    path: 'name'
                }
            })
            .exec();
            console.log(purchases[0].articles)
            resolve(purchases)
        })
    }
}
