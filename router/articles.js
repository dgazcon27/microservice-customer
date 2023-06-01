const { Router } = require("express");

const { 
    createArticle,
} = require('../controller/Articles/article.controller')


const routerArticle = Router();

routerArticle.post('/', createArticle);

module.exports = { routerArticle }
