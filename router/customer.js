const { Router } = require("express");
const { 
    getCustomerByDni, 
    getCustomersPaginated, 
    updateCustomer ,
    test
} = require('../controller/customer.controller')
const validatorHandler = require("../middleware/validatorHandler")
const {
  getCustomerPaginateSchema,
  getCustomerByDniSchema,
  patchCustomerSchema
} = require("../schema/customer.schema")

const routerCustomer = Router();

routerCustomer.post("/:dni", validatorHandler(getCustomerByDniSchema, "params"), getCustomerByDni);
routerCustomer.get('/', validatorHandler(getCustomerPaginateSchema, "query"), getCustomersPaginated);
routerCustomer.patch('/:id', validatorHandler(patchCustomerSchema, "body"), updateCustomer);

routerCustomer.get('/test', test);

module.exports = routerCustomer;
