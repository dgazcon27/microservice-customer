const Joi = require("joi");

const page = Joi.number().integer();
const limit = Joi.number().integer();
const dni = Joi.number().integer();

const getCustomerPaginateSchema = Joi.object({
    page: page.required(),
    limit: limit.required()
})

const getCustomerByDniSchema = Joi.object({
    dni: dni.required(),
})

module.exports = {
    getCustomerPaginateSchema,
    getCustomerByDniSchema
}