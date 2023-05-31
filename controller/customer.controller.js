const CustomerService = require('../services/services.customer')
const Customer = require('../models/customer')
const mongoose = require("mongoose");
const { custom } = require('joi');

const Schema = new mongoose.Schema({ name: String });
const Movie = mongoose.model('movie', Schema);

function getCustomerByDni (req, res, next) {
    const customerService = new CustomerService();
    customerService
    .getCustomerByDni(req.params.dni)
    .then(result => {
      if (result.length > 0) {
        const data = new Customer().parseResponseToModel(result[0])
        res.status(200).json({data});
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
    const data = result.map(item => new Customer().parseResponseToModel(item))
    res.status(200).json({data})
  })
  .catch(error => next(error))
}

async function updateCustomer(req, res, next) {
  const customerService = new CustomerService();
  const { body } = req;
  const { id } = req.params

  try {
    const bodyParsed = new Customer().parseCustomerToModel(body);
    response = await customerService.updateCustomer(id, bodyParsed)
    res.status(200).json({})
  } catch (error) {
    console.log("UPDATE CUSTOMER", error)
    next(error)
  }
}

const getCustomers = async (req, res, next) =>{
  const customerService = new CustomerService();
  try {
    const customers = (await customerService.getCustomers()).map(customer => new Customer(customer))
    console.log(customers)
    return res.status(200).json(customers)
  } catch (error) {
    next(error)
  }
}

const createCustomer = async (req, res, next) =>{
  const { body } = req
  const customerService = new CustomerService();
  try {
    const customer = new Customer(await customerService.createCustomer(body))
    return res.status(200).json(customer)
  } catch (error) {
    next(error)
  }
}


module.exports = {
    getCustomerByDni,
    getCustomersPaginated, 
    updateCustomer,
    getCustomers,
    createCustomer
}
