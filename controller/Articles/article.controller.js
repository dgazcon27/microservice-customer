const ArticleService = require('../../services/Articles/services.articles')
const ArticleModel = require('../../models/Articles/articles')

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

module.exports = {
    createArticle
}
  