module.exports = class Customer {
    constructor() {
        this.address = "";
        this.dni = "";
        this.customerType = "";
        this.name = "";
    }

    parseCustomerToModel(customer) {
        return {
            "DIRECCION":customer.address,
            "NUMERO_IDENTIFICACION_CLIENTE": customer.dni,
            "TIPOCLIENTE": customer.customerType,
            "NOMBRE": customer.name
        }
    }

    parseResponseToModel(customer) {
        //console.log(customer)
        this.address = customer["DIRECCION"];
        this.dni = customer["NUMERO_IDENTIFICACION_CLIENTE"];
        this.customerType = customer["TIPOCLIENTE"];
        this.name = customer["NOMBRE"];
        return this;
    }
}