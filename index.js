const express = require('express')
const { getCustomerByDni, getCustomersPaginated, updateCustomer } = require('./controller/customer.controller')
const {
  errorLogger,
  errorResponder 
} = require('./middleware/responseHandler')
const validatorHandler = require("./middleware/validatorHandler")
const {
  getCustomerPaginateSchema,
  getCustomerByDniSchema,
  patchCustomerSchema
} = require("./schema/customer.schema")

const app = express()
app.use(express.json())   


app.get('/:dni', validatorHandler(getCustomerByDniSchema, "params"), getCustomerByDni);
app.get('/', validatorHandler(getCustomerPaginateSchema, "query"), getCustomersPaginated);
app.patch('/:id', validatorHandler(patchCustomerSchema, "body"), updateCustomer);

app.use(errorLogger)
app.use(errorResponder)

module.exports = app;
