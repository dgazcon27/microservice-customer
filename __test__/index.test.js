const request = require("supertest");
const app = require("../index");

require("dotenv").config();

describe("GET /api/customer", () => {
    it("Should return all customer from customer/", async () => {
        const limit = 5;
        const res = await request(app).get(`/?page=1&limit=${limit}`);
        const response = JSON.parse(res.text)
        expect(res.statusCode).toBe(200);
        expect(response.data.length).toBe(limit)
    });

    it("Should return one customer from customer/:dni", async () => {
        const userID = 9999999887;

        const res = await request(app).get(`/${userID}`);
        const response = JSON.parse(res.text)
        expect(res.statusCode).toBe(200);
        expect(parseInt(response.data.dni)).toBe(userID)
    })
});
  
