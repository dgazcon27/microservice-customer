const { getConnection } = require("./utils/dbConnection")

const app = require("./index")
const axios = require("axios");
const path = require("path")
require('dotenv').config();

const port = process.env.PORT || 8989;

getConnection()

try {
  app.listen(port, () =>
    console.log(`API listening on port: ${port}!`)
  );
} catch (error) {
  console.log(error)
}
