const { Router } = require("express");

const { 
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    findArticlesById,
    restockArticle
} = require('../controller/Articles/article.controller')


const routerArticle = Router();

routerArticle.post('/', createArticle);
routerArticle.get('/:id', getArticleById)
routerArticle.post('/find-articles', findArticlesById);
// Endpoint para la reposicion de articulos
routerArticle.patch('/restock-article/:id', restockArticle)
routerArticle.get('/', getArticles);
routerArticle.patch('/:id', updateArticle);

module.exports = { routerArticle }
