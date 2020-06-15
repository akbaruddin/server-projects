const express = require("express");
const path = require("path");
const favicon = require('express-favicon');

const app = express();
const PORT = process.env.PORT || 8080;

// favicon
app.use(favicon(__dirname + '/public/favicon.png'));

// static resource
app.use('/public', express.static(path.join(__dirname, '/public')));

// route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// start server
app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`)
});
