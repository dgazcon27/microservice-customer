const CustomerService = require('../services/services.customer')
const Customer = require('../models/customer')

function getCustomerByDni (req, res, next) {
    const customerService = new CustomerService()    
    customerService
    .getCustomerByDni(req.params.dni)
    .then(result => {
      if (result.length > 0) {
        let data = new Customer(result[0])
        res.status(200).json({ data });
      } else {
        let error = new Error("Customer not found")
        error.status = 404;
        next(error)
      }
    })
    .catch(next)
  }

function getCustomersPaginated (req, res, next) {
  const {page, limit} = req.query;
  const offset = (parseInt(page, 10)-1)*5
  const lim = parseInt(limit)
  const customerService = new CustomerService();
  customerService.getCustomers(offset, lim)
  .then(result => {
    const response = result.map(item => new Customer(item))
    res.status(200).json({response})
  })
  .catch(error => next(error))
}

async function updateCustomer(req, res, next) {
  const customerService = new CustomerService();
  const { body } = req;
  const { id } = req.params

  try {
    response = await customerService.updateCustomer(id, body)
    res.status(200).json({})
  } catch (error) {
    next(error)
  }
}


module.exports = {
    getCustomerByDni,
    getCustomersPaginated, 
    updateCustomer
}
