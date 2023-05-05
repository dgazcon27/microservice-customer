const Joi = require("joi");

const page = Joi.number().integer();
const limit = Joi.number().integer();
const dni = Joi.string();
const address = Joi.string();
const customerType = Joi.string();
const name = Joi.string();

const getCustomerPaginateSchema = Joi.object({
    page: page.required(),
    limit: limit.required()
})

const getCustomerByDniSchema = Joi.object({
    dni: dni.required(),
})

const patchCustomerSchema = Joi.object({
    dni: dni.required(),
    address: address.required(),
    customerType: customerType.required(),
    name: name.required()
})

module.exports = {
    getCustomerPaginateSchema,
    getCustomerByDniSchema,
    patchCustomerSchema
}