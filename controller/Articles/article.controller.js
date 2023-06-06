const ArticleService = require('../../services/Articles/services.articles')
const ArticleModel = require('../../models/Articles/articles')
const { convertDate } = require("../../utils/tools")

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

const getArticleById = async (req, res, next) => {
    console.log("Begin get article by ID")
    const { id } = req.params
    try {
        const article = await articleService.getArticleById(id)
        return res.status(200).json(new ArticleModel(article))
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
    const { quantity } = req.body
    const articleBody = {quantity, updatedAt: convertDate()}
    const { id } = req.params
    try {
        const article = await articleService.updateArticle(articleBody, id)
        return res.status(200).json(new ArticleModel(article))
    } catch (error) {
        next(error)
    }
    
} 

module.exports = {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    findArticlesById,
    restockArticle
}
  