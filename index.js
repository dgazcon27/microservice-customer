const express = require('express')
const { getCustomerByDni, getCustomersPaginated, updateCustomer } = require('./controller/customer.controller')
const {
  errorLogger,
  errorResponder 
} = require('./middleware/responseHandler')
const validatorHandler = require("./middleware/validatorHandler")
const {
  getCustomerPaginateSchema,
  getCustomerByDniSchema
} = require("./schema/customer.schema")

const port = process.env.PORT || 3000;
const app = express()
app.use(express.json())   


app.get('/:dni', validatorHandler(getCustomerByDniSchema, "params"), getCustomerByDni);
app.get('/', validatorHandler(getCustomerPaginateSchema, "query"), getCustomersPaginated);
app.patch('/:id', updateCustomer);

app.use(errorLogger)
app.use(errorResponder)

app.listen(port, () =>
  console.log(`API listening on port: ${port}!`)
);
