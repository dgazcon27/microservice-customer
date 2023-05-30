const mongoose = require("mongoose");

const app = require("./index")

const port = process.env.PORT || 8989;

const username = "root";
const password = "root";
const cluster = "<cluster name>";
const dbname = "myFirstDatabase";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

try {
  app.listen(port, () =>
    console.log(`API listening on port: ${port}!`)
  );
} catch (error) {
  console.log(error)
}