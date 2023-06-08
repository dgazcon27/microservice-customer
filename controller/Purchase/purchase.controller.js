const PurchaseService = require('../../services/Purchase/services.purchase')
const ArticleServices = require('../../services/Articles/services.articles')
const PurchaseModel = require('../../models/Purchase/purchase')
const purchaseService = new PurchaseService();


const createPurchase = async (req, res, next) =>{
    const { body } = req
    try {
      
      if (body.price === 0) {
        return res.status(400).json({message: `Price can't be 0`})
      }
      
      const articleService = new ArticleServices()
      const { articles } = body
      const articleList = articles.map(item => item.article);
      const responseArticle = await articleService.findArticlesById(articleList);
      
      // validate quantity available

      console.log("Setting quantity article by id_article")
      const articlesAmounts = setArticlesAmount(articles)
      console.log("check availability of articles")
      const checkedAvailability = checkArticlesAvailables(articlesAmounts, responseArticle);
      if (checkedAvailability.length > 0) {
        return res.status(400).json({message: `Article ${checkedAvailability[0].name} not available`})
      }

      // Create purchase 
      const purchase = new PurchaseModel(await purchaseService.createPurchase(body))

      // Update articles with new amount
      const articlesToUpdate = responseArticle.map(item => {
        return {
          ...item,
          _id: item._id,
          quantity:item.quantity-articlesAmounts[item._id]
        }
      })
      
      const updatedArticles = articlesToUpdate.map(item => {
        return new Promise((resolve, reject) => {
          articleService.updateArticle({quantity: item.quantity}, item._id )
          .then(res => resolve(res)) 
          .catch(err => reject(err)) 
        })
      })

      const response = await Promise.all(updatedArticles)
      console.log(response)

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

const restockArticle = async(req, res, next) => {
  const { body } = req
  const { articles } = body
  try {
    const articleService = new ArticleServices()
    const articlesAmounts = setArticlesAmount(body.articles)
    const responseArticle = await articleService.findArticlesById(articles.map(item => item.article));
    if(responseArticle.length === 0) {
      return res.status(404).json({message: `Article with id: ${articleId} doesn't exist`})
    }
    body.type = 'INCOME';
    body.price = 0;
    const purchase = new PurchaseModel(await purchaseService.createPurchase(body))

    if (!purchase) {
      // creation purchased failed
      console.log("Creation purchased failed")
      return res.status(404).json({message: "Creation purchased failed"})
    }

    // Update articles with new amount
    const articlesToUpdate = responseArticle.map(item => {
      return {
        _id: item._id,
        quantity:item.quantity+articlesAmounts[item._id]
      }
    })

    const updatedArticles = articlesToUpdate.map(item => {
      return new Promise((resolve, reject) => {
        articleService.updateArticle({quantity: item.quantity}, item._id )
        .then(res => resolve(res)) 
        .catch(err => reject(err)) 
      })
    })

    await Promise.all(updatedArticles)
    return res.status(200).json({purchase})

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error."})
  }
}

const getPurchasesByDni = async (req, res, next) => {
  const { dni } = req.params
  try {
    const filter = {"client.dni": dni}
    const responsePurchase = await purchaseService.getPurchasesByIdAndType(dni)
    if (responsePurchase.length === 0)
        return res.status(404).json({message: `Purchases for customer id: ${dni} not found`})

    return res.status(200).json(responsePurchase.map(item => new PurchaseModel(item)) )
  } catch (error) {
      next(error)
  }
}

const checkArticlesAvailables = (idsArticles, articles) => {
  const responseAvailables = []
  articles.forEach(item => {
    if (item.quantity-idsArticles[item._id] < 0) responseAvailables.push(item)
  });
  console.log("Articles not availables", responseAvailables)
  return responseAvailables
}

const setArticlesAmount = (articlesRequested) => {
  const idsArticles = {}
  articlesRequested.forEach(element => {
    idsArticles[element.article] = element.quantity;
  });
  return idsArticles;
}

module.exports = {
    createPurchase,
    getPurchases,
    restockArticle,
    getPurchasesByDni
}