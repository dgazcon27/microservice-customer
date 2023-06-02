const { Router } = require("express");

const { 
    createPurchase,
} = require('../controller/Purchase/purchase.controller')

const routerPurchase = Router();

routerCustomer.post('/', createPurchase);


module.exports = routerPurchase;