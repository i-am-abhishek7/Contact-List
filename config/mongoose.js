// Require the libraray
const mongoose = require("mongoose");

// Conncect to the database
mongoose.connect("mongodb://localhost:27017/contactList");

// Acquire the connection (to check if it successful)
const DB = mongoose.connection;

// If there is any error
DB.on("error", console.error.bind(console, "error connecting to db"));

// Up and running then print the message
DB.once("open", () => {
  console.log("DB connection successfull!..");
});

/*
mongoose.connect("mongodb://localhost:27017/contactList").then(() => {
  console.log("DB connection successfull!");
});
*/
