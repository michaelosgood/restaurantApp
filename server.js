// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Reservations (DATA)
// =============================================================
var reservations = [{
  routeName: "yoda",
  name: "Yoda",
  email: "yoda@gmail.com",
  phone: "800-960-2135",
  uniqueID: "0"
}, {
    routeName:"darth",
    name: "Darthmaul",
    email: "Jedi@gmail.com",
    phone: "303-234-3456",
    uniqueID: "1"
}];

// Array to store waitingList
var waitingList = [{
    name: "Michael",
    email: "mike@gmail.com",
    phone: "231-123-0012",
    uniqueID: "2",
}];

// Array to store tableList
var tableList = [{
    name: "Ahmed",
    email: "ahmed@gmail.com",
    phone: "321-231-1234",
    uniqueID: "3",
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Get all Reservations
app.get("/tables", function(req, res) {
res.sendFile(path.join(__dirname, "tables.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:reservations?", function(req, res) {
  var chosen = req.params.characters;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});

// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  characters.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Takes reservations inf