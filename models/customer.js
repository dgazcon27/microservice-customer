module.exports = class Customer {
    constructor(customer) {
        this.address = customer["DIRECCION"] || "";
        this.dni = customer["NUMERO_IDENTIFICACION_CLIENTE"] || "";
        this.customerType = customer["TIPOCLIENTE"] || "";
        this.name = customer["NOMBRE"] || "";
    }
}