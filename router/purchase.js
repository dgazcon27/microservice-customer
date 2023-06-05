const { Router } = require("express");

const { 
    createPurchase,
    getPurchases
} = require('../controller/Purchase/purchase.controller')

const routerPurchase = Router();

routerPurchase.post('/', createPurchase);
routerPurchase.get('/', getPurchases);


module.exports = { routerPurchase };