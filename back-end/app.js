const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const Recipe = require("./src/models/recipe"); //import the item model


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;

app.use(cors());

const connectionURI =
  "mongodb+srv://lakmalasela95:lakmal160@cluster0.y6orkp7.mongodb.net/hotel-management-system?retryWrites=true&w=majority";

mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //established the connection

//check the if have any error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB Connected");
});

//get method
// app.get("/", function (req, res) {
//   res.send("Hello World");
// });


const routes = require('./src/controllers/index');
routes.forEach(([name,handler]) => app.use(`/${name}`,handler));

//config the port
app.listen(port, () => {
  console.log("Server Started");
});
