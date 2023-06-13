const PurchaseRepository = require("../../models/Purchase/purchaseRepository")
const CustomerService = require("../../services/Customer/services.customer")
const ArticleServices = require("../../services/Articles/services.articles")

module.exports = class PurchaseService {
    createPurchase(body) {
        // console.log("Body purchase create", body)
        console.log(body)
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
            resolve(purchases)
        })
    }

    getPurchasesByIdAndType(dni) {
        console.log(`Return articles by filter ${dni}`)
        console.log(dni)
        return new Promise(async (resolve, reject) => {
            const customerService = new CustomerService();
            const customer = await customerService.getCustomerByDni(dni);
            console.log(customer)
            const purchases = await PurchaseRepository.find({client: customer._id})
            .populate({path:'articles.article', select: 'name unitPrice'})
            .populate('client');
            resolve(purchases)
        })
    }

    // getPurchasesByArticle(name) {
    //     console.log("Gtting article by name")
    //     console.log(name)
    //     return new Promise(async (resolve, reject) => {
    //         const articleService = new ArticleServices();
    //         const article = await articleService.get
    //     })
    // }


}
