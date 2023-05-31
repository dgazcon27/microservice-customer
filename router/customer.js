const { Router } = require("express");
const { 
    getCustomerByDni, 
    getCustomersPaginated, 
    updateCustomer ,
    getCustomers,
    createCustomer
} = require('../controller/customer.controller')
const validatorHandler = require("../middleware/validatorHandler")
const {
  getCustomerPaginateSchema,
  getCustomerByDniSchema,
  patchCustomerSchema
} = require("../schema/customer.schema")

const routerCustomer = Router();

//routerCustomer.get('/:id', validatorHandler(getCustomerPaginateSchema, "query"), getCustomersPaginated);
//routerCustomer.post("/:dni", validatorHandler(getCustomerByDniSchema, "params"), getCustomerByDni);
//routerCustomer.patch('/:id', validatorHandler(patchCustomerSchema, "body"), updateCustomer);
routerCustomer.post('/', createCustomer);
routerCustomer.get('/', getCustomers);

module.exports = routerCustomer;
