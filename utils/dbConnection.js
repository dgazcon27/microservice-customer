const mongoose = require("mongoose");
require('dotenv').config();

function getConnection() {
    const username = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const cluster = process.env.DB_HOST;
    const dbname = process.env.DB_DATABASE;

    const stringConnection = `${username}:${password}@${cluster}/${dbname}`

    mongoose.connect(
    `mongodb://${stringConnection}`
    );

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
}

module.exports.getConnection = getConnection