const { Router } = require("express");

const { 
    createArticle,
    getArticles,
    getArticleByField,
    updateArticle,
    findArticlesById,
    restockArticle,
    createProductByText
} = require('../controller/Articles/article.controller')


const routerArticle = Router();

routerArticle.get('/restock-article/:id', restockArticle)
routerArticle.get('/', getArticles);

routerArticle.post('/find-articles', findArticlesById);
routerArticle.post('/filter-article', getArticleByField)
routerArticle.post('/article-profit-by-text', createProductByText)
routerArticle.post('/', createArticle);
// Endpoint para la reposicion de articulos
routerArticle.patch('/:id', updateArticle);

module.exports = { routerArticle }
