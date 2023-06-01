const express = require('express')
const {
  errorLogger,
  errorResponder 
} = require('./middleware/responseHandler')

const { routerCustomer } = require("./router/customer")
const { routerArticle } = require("./router/articles")

const app = express()
app.use(express.json())   
app.use("/api/v1/customer", routerCustomer);
app.use("/api/v1/article", routerArticle);

app.use(errorLogger)
app.use(errorResponder)

module.exports = app;
