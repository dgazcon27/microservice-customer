const express = require('express')
const {
  errorLogger,
  errorResponder 
} = require('./middleware/responseHandler')

const routerCustomer = require("./router/customer")

const app = express()
app.use(express.json())   
app.use("/api/v1", routerCustomer);

app.use(errorLogger)
app.use(errorResponder)

module.exports = app;
