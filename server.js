// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Reservations (DATA)
// =============================================================
var reservations = [{
  customerName: 'Yoda',
  customerEmail: 'yoda@gmail.com',
  phoneNumber: 8009602135,
  customerID: 'yoda 2'
}, {
    customerName: 'Darthmaul',
    customerEmail: 'Jedi@gmail.com',
    phoneNumber: 8009432311,
    customerID: 2
}];

var waitingList = [];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/reserve', function(req, res) {
  res.sendFile(path.join(__dirname, 'reserve.html'));
});

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });


// Search for Specific Reservation (or all reservations) - provides JSON
app.get('/api/reservations', function(req, res) {
  return res.json(reservations);
});

app.get('/api/waitingList', function(req, res) {
    return res.json(waitingList);
  });

// Create New reservations - takes in JSON input
app.post('/api/tables', function(req, res) {
  var newReservation = req.body;
  newReservation.customerName = newReservation.customerName.replace(/\s+/g, '').toLowerCase();
  if (reservations.length < 3) {
    reservations.push(newReservation);
    console.log(reservations);
    // res.json(reservations);
    res.json(true);
  } else {
    waitingList.push(newReservation);
    console.log(waitingList);
    res.json(false);
  }
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});