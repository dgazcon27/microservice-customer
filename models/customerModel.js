module.exports = class CustomerModel {
    constructor(customer) {
        return customerModel = {
            "DIRECCION":customer.address,
            "NUMERO_IDENTIFICACION_CLIENTE": customer.dni,
            "TIPOCLIENTE": customer.customerType,
            "NOMBRE": customer.name
        }
    }
}