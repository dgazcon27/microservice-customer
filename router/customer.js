const { Router } = require("express");
const { 
    getCustomers,
    createCustomer,
    getCustomerByDni,
    updateCustomer
} = require('../controller/Customer/customer.controller')

const routerCustomer = Router();

routerCustomer.post('/', createCustomer);
routerCustomer.patch('/:id', updateCustomer);
routerCustomer.get('/:dni', getCustomerByDni);
routerCustomer.get('/', getCustomers);


module.exports = routerCustomer;
