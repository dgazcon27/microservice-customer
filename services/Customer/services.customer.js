const Customer = require("../../models/Customer/customerRepository")

module.exports = class CustomerService {    

    getCustomers() {
        return new Promise(async (resolve, reject) => {
            const customers = await Customer.find({})
            resolve(customers)
        })
    }

    createCustomer(body) {
        const { dni } = body
        return new Promise(async (resolve, reject) => {
            try {
                const count = await Customer.countDocuments({ dni });
                if(count > 0) reject({details: `User with profileId ${dni} already exists.`})
                const customer = await new Customer(body).save();
                resolve(customer);
            } catch (err) {
                reject(err)
            }
        }) 
    }

    getCustomerByDni(dni) {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await Customer.find({ dni });
                if (customer.length === 0) reject({details: `Customer with ${dni} does not exist.`})
                resolve(customer[0]);
            } catch (err) {
                reject(err)
            }
        }) 
    }

    updateCustomer(body, _id) {
        console.log(body, _id)
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await Customer.updateOne({_id},body);
                console.log(customer)
                if (customer.length === 0) {
                    reject({details: `Update customer failed`})
                }
                resolve(customer);
            } catch (err) {
                reject(err)
            }
        }) 
    }
}