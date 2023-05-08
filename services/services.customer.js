const { getProperties } = require('../utils/readerQuery')
const { 
    QUERY_PROPERTY_PATH, 
    QUERY_REQUEST_GET_ONE,
    QUERY_REQUEST_GET_ALL
} = require("../constants/filesQueryConstants")
const { getDbConf } = require("../utils/readerQuery")

const config = getDbConf();

const pool = require('node-jt400').pool(config);

module.exports = class CustomerService {    
    getCustomerByDni(dni) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = getProperties(QUERY_PROPERTY_PATH, QUERY_REQUEST_GET_ONE)
                const results = await pool.query(query, [dni]);
                pool.close();
                resolve(results)
            } catch (error) {
                reject(error)
            }
        })
    }

    getCustomers(offset, limit) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = getProperties(QUERY_PROPERTY_PATH, QUERY_REQUEST_GET_ALL)
                const results = await pool.query(query, [limit, offset]);
                pool.close()
                resolve(results)
            } catch (error) {
                reject(error)
            }
        })
    }

    updateCustomer(id, body) {
        return new Promise(async (resolve, reject) => {
            console.log(id, body)
            resolve()
        })
    }
}