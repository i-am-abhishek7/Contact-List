const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const DB = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

//1) Telling the app that ejs is the view point
app.set("view engine", "ejs");

// 2) Tell where we put view
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

// For using static files
app.use(express.static("assets"));
const port = 3000;

let contactList = [
  {
    name: "Abhishek",
    phone: "7838813131",
  },
  {
    name: "Priyanshu",
    phone: "9528507930",
  },
  {
    name: "Ayush",
    phone: "7838913131",
  },
];

app.get("/", (req, res) => {
  // Fetching the contact from the database
  Contact.find({}, (err, contacts) => {
    if (err) {
      return console.log("Error in fetching contact from DB..");
    }

    return res.render("home", {
      title: "Contacts List",
      contacts,
    });
  });
});

// Create a Contact
app.post("/create-contact", (req, res) => {
  // contactList.push(req.body);

  // push it to the database
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    (err, newContact) => {
      if (err) {
        return console.log("error in creating a contact!");
      }

      return res.redirect("back");
    }
  );
});

// Deleting a Contact
app.get("/delete-contact", (req, res) => {
  // Get the id from query in the url
  let id = req.query.id;

  // Find the contact in the DB using id and Delete
  Contact.findByIdAndDelete(id, (err) => {
    if (err) {
      return console.log("Error in deleting an object from DB");
    }

    return res.redirect("back");
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log(`App is running on port ${port}...`);
});
