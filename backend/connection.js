const mongoose = require("mongoose");
const cors = require("cors")
const connect = mongoose
  .connect("mongodb+srv://abhishekdj515:abhishekdj515@cluster0.i5cwzkp.mongodb.net/todo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
    console.log("Error while connecting to database");
  });

module.exports = connect;
