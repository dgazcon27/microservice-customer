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
    console.log(body)
    // try {
    //     const article = await articleService.getArticleByField(body)
    //     return res.status(200).json(new ArticleModel(article))
        return res.status(200).json({})
    // } catch (error) {
    //     next(error)
    // }
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

module.exports = {
    createArticle,
    getArticles,
    getArticleByField,
    updateArticle,
    findArticlesById,
    restockArticle
}
  