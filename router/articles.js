const { Router } = require("express");

const { 
    createArticle,
    getArticles,
    getArticleById,
    updateArticle
} = require('../controller/Articles/article.controller')


const routerArticle = Router();

routerArticle.post('/', createArticle);
routerArticle.get('/:id', getArticleById)
routerArticle.get('/', getArticles);
routerArticle.patch('/:id', updateArticle);

module.exports = { routerArticle }
