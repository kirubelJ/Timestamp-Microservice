// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// your Second API endpoint...
app.get("/api/:date?", function (req, res) {
  const inputDate = req.params.date;

  if (!inputDate) {
    // If no date is provided, return current UTC time
    const currentDate = new Date();
    res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
    return;
  }

  const timestamp = parseInt(inputDate); // Try to parse inputDate as a Unix timestamp

  // Check if inputDate is a valid Unix timestamp (in milliseconds)
  if (!isNaN(timestamp)) {
    const d = new Date(timestamp);

    // Check if the parsed date object is valid
    if (!isNaN(d.getTime())) {
      res.json({
        unix: d.getTime(),
        utc: d.toUTCString(),
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    // If inputDate is not a valid Unix timestamp
    const d = new Date(inputDate); // Try parsing inputDate as a date string

    // Check if the parsed date object is valid
    if (!isNaN(d.getTime())) {
      res.json({
        unix: d.getTime(),
        utc: d.toUTCString(),
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
