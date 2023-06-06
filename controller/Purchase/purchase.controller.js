const PurchaseService = require('../../services/Purchase/services.purchase')
const ArticleServices = require('../../services/Articles/services.articles')
const PurchaseModel = require('../../models/Purchase/purchase')
const purchaseService = new PurchaseService();


const createPurchase = async (req, res, next) =>{
    const { body } = req
    try {
      const articleService = new ArticleServices()
      const { articles } = body
      const articleList = articles.map(item => item.article_id);
      console.log("extracted articles", articleList)
      const responseArticle = await articleService.findArticlesById(articleList);
      
      // validate quantity available
      const checkedAvailability = checkArticlesAvailables(articles, responseArticle);
      if (checkedAvailability.length > 0) {
        return res.status(400).json({message: `Article ${checkedAvailability[0].name} not available`})
      }

      // Create purchase 
      const purchase = new PurchaseModel(await purchaseService.createPurchase(body, responseArticle))
      return res.status(200).json(purchase)
    } catch (error) {
      next(error)
    }
}

const getPurchases = async (req, res, next) => {
  try {
    const purchase = await purchaseService.getPurchases();
    return res.status(200).json(purchase.map(item => new PurchaseModel(item)))
  } catch (error) {
    next(error)
  }
}

const checkArticlesAvailables = (articlesRequested, articles) => {
  const idsArticles = {}
  articlesRequested.forEach(element => {
    idsArticles[element.article_id] = element.quantity;
  });
  const responseAvailables = []
  articles.forEach(item => {
    if (item.quantity-idsArticles[item._id] < 0) responseAvailables.push(item)
  });
  console.log("Articles not availables", responseAvailables)
  return responseAvailables
}

module.exports = {
    createPurchase,
    getPurchases
}