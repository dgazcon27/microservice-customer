const { Router } = require("express");

const { 
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    findArticlesById
} = require('../controller/Articles/article.controller')


const routerArticle = Router();

routerArticle.post('/', createArticle);
routerArticle.get('/:id', getArticleById)
routerArticle.post('/find-articles', findArticlesById);
routerArticle.get('/', getArticles);
routerArticle.patch('/:id', updateArticle);

module.exports = { routerArticle }
