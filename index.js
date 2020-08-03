const express = require("express");
const app = express();

// Middleware function to log request protocol
app.use('/things', function(req, res, next){
  console.log("A request for things received at " + Date.now());
  next();
});

// Route handler that sends the response
app.get('/things', function(req, res){
  res.send('Things');
});

app.get("/", function(req, res) {
  res.send("Hello world!");
})

app.listen(3000);