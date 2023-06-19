const ArticleService = require('../../services/Articles/services.articles')
const PurchaseService = require('../../services/Purchase/services.purchase')
const ArticleModel = require('../../models/Articles/articles')
const { convertDate } = require("../../utils/tools");
const PurchaseModel = require('../../models/Purchase/purchase');

const articleService = new ArticleService();


const createArticle = async (req, res, next) =>{
    console.log("Begin create article")
    const { body } = req
    try {
      const article = new ArticleModel(await articleService.createArticle(body))
      console.log("Article create successfully")
      return res.status(200).json(article)
    } catch (error) {
      next(error)
    }
}

const getArticles = async (req, res, next) => {
    console.log("Begin get all article")
    try {
        const articles = (await articleService.getArticles()).map(article => new ArticleModel(article))
        console.log("Return articles", articles)
        return res.status(200).json(articles)
    } catch (error) {
        next(error)
    }
}

const getArticleByField = async (req, res, next) => {
    console.log("Begin get article by filter")
    const { body } = req
    if (body.name) {
        body.name = { $regex: '.*' + body.name + '.*', $options: 'i' }
    }
    try {
        const article = await articleService.getArticleByField(body)
        if (article.details)
            return res.status(404).json({message: article.details})
        
        return res.status(200).json(article.map(item => new ArticleModel(item)))
    } catch (error) {
        next(error)
    }
}

const updateArticle =  async (req, res, next) => {
    const articleBody = {...req.body, updatedAt: convertDate()}
    const { id } = req.params
    try {
        const article = await articleService.updateArticle(articleBody, id)
        return res.status(200).json(new ArticleModel(article))
    } catch (error) {
        next(error)
    }
}

const findArticlesById = async (req, res, next) => {
    const { ids } = req.body
    try {
        const responseArticle = await articleService.findArticlesById(ids)
        return res.status(200).json(responseArticle.map(article => new ArticleModel(article)))
    } catch (error) {
        next(error)
    }
    
} 

const restockArticle = async (req, res, next) => {
    const { id } = req.params
    const purchaseService = new PurchaseService()
    try {
        const filter = {'articles.article': id, type: 'INCOME'}
        const responseArticle = await purchaseService.getPurchasesByIdAndType(filter)
        if (responseArticle.length === 0)
            return res.status(404).json({message: 'Article not found'})

        return res.status(200).json(responseArticle.map(item => new PurchaseModel(item)) )
    } catch (error) {
        next(error)
    }
}

const createProductByText = async(req, res, next) => {
    console.log("requesting creation from message");
    const { message } = req.body;
    const itemList = message.split(",").map(item => item.trim());
    if (itemList.length !== 5) {
        console.log("Request body", itemList);
        return res.status(400).json({message: 'Inconsistency in amount of fields'});
    }
    const article = getItemFromList(itemList);
    console.log(article);
    productPrice = parseFloat((article.totalCostProduct/article.unitPerPackage).toFixed(2));
    profitProduct = parseFloat(((productPrice*article.profit)/100).toFixed(2));
    productCost = parseFloat((productPrice + profitProduct).toFixed(2));
    resultTotalProfit = ((article.totalCostProduct*30)/100)+article.totalCostProduct
    totalProfit = parseFloat((resultTotalProfit-article.totalCostProduct).toFixed(2))
    totalProduct = parseFloat((totalProfit+article.totalCostProduct).toFixed(2))
    return res.status(200).json({productPrice, profitProduct, productCost, totalProfit, totalProduct});
}

const getItemFromList = (itemList) => {
    return {
        name: itemList[0],
        unitPerPackage: parseInt(itemList[1]),
        unitSell: parseInt(itemList[2]),
        profit: parseFloat(itemList[3]),
        totalCostProduct: parseFloat(itemList[4])
    };
}

module.exports = {
    createArticle,
    getArticles,
    getArticleByField,
    updateArticle,
    findArticlesById,
    restockArticle,
    createProductByText
}
  