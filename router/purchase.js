const { Router } = require("express");

const { 
    createPurchase,
    getPurchases,
    restockArticle,
    getPurchasesByDni
} = require('../controller/Purchase/purchase.controller');

const routerPurchase = Router();

routerPurchase.post('/restock-articles', restockArticle)
routerPurchase.post('/', createPurchase);

routerPurchase.get('/purchases-by-dni/:dni', getPurchasesByDni)
routerPurchase.get('/', getPurchases);


module.exports = { routerPurchase };