const { Router } = require("express");

const { 
    createArticle,
    getArticles,
    getArticleByField,
    updateArticle,
    findArticlesById,
    restockArticle,
    createProductByText,
    createProductoFromMessage,
    deleteArticleById
} = require('../controller/Articles/article.controller')

//TODO: Validar que el tipo de archivo ingresado sea el correcto: JSON

const routerArticle = Router();

routerArticle.get('/restock-article/:id', restockArticle)
routerArticle.get('/', getArticles);

routerArticle.post('/find-articles', findArticlesById);
routerArticle.post('/filter-article', getArticleByField)
routerArticle.post('/article-profit-by-text', createProductByText)
routerArticle.post('/create-product-from-msg', createProductoFromMessage)
routerArticle.post('/', createArticle);
// Endpoint para la reposicion de articulos
routerArticle.patch('/:id', updateArticle);
routerArticle.delete('/:id', deleteArticleById)

module.exports = { routerArticle }
