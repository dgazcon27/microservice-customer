const { Router } = require("express");

const { 
    createPurchase,
    getPurchases,
    restockArticle,
    getPurchasesByDni,
    getPurchasesByArticle
} = require('../controller/Purchase/purchase.controller');

const routerPurchase = Router();

routerPurchase.post('/restock-articles', restockArticle)
routerPurchase.post('/purchases-by-article/:name', getPurchasesByArticle)
routerPurchase.post('/', createPurchase);

routerPurchase.get('/purchases-by-dni/:dni', getPurchasesByDni)
routerPurchase.get('/', getPurchases);


module.exports = { routerPurchase };