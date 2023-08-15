const express = require('express')
var cors = require('cors')
const {
  errorLogger,
  errorResponder 
} = require('./middleware/responseHandler')

const { routerCustomer } = require("./router/customer")
const { routerArticle } = require("./router/articles")
const { routerPurchase } = require("./router/purchase")

const app = express()
app.use(cors())
app.use(express.json())   
app.use("/api/v1/customer", routerCustomer);
app.use("/api/v1/article", routerArticle);
app.use("/api/v1/purchase", routerPurchase);

app.use(errorLogger)
app.use(errorResponder)

module.exports = app;
