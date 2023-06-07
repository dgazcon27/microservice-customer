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

routerArticle.get('/restock-article/:id', restockArticle)
routerArticle.get('/:id', getArticleById)
routerArticle.get('/', getArticles);

routerArticle.post('/', createArticle);
routerArticle.post('/find-articles', findArticlesById);
// Endpoint para la reposicion de articulos
routerArticle.patch('/:id', updateArticle);

module.exports = { routerArticle }
