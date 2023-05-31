const CustomerService = require('../../services/Customer/services.customer')
const Customer = require('../../models/Customer/customer')

const customerService = new CustomerService();

const getCustomers = async (req, res, next) =>{
  try {
    const customers = (await customerService.getCustomers()).map(customer => new Customer(customer))
    return res.status(200).json(customers)
  } catch (error) {
    next(error)
  }
}

const createCustomer = async (req, res, next) =>{
  const { body } = req
  try {
    const customer = new Customer(await customerService.createCustomer(body))
    return res.status(200).json(customer)
  } catch (error) {
    next(error)
  }
}

const getCustomerByDni = async (req, res, next) => {
  const { dni } = req.params
  try {
    const customer = await customerService.getCustomerByDni(dni)
    return res.status(200).json(new Customer(customer))
  } catch (error) {
    next(error)
  }
}

const updateCustomer = async (req, res, next) => {
  const { body } = req
  const { id } = req.params
  try {
    const response = await customerService.updateCustomer(body, id)
    return res.status(200).json(new Customer(response))
  } catch (error) {
    next(error)
  }
}


module.exports = {
    getCustomerByDni,
    getCustomers,
    createCustomer,
    updateCustomer
}
