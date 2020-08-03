const express = require("express");

const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.set('views','./views');
// Middleware function to log request protocol
app.use('/things', function(req, res, next){
  console.log("A request for things received at " + Date.now());
  next();
});

app.get('/things/:id([0-9]{5})', function(req, res){
  res.send('id: ' + req.params.id);
});

app.get('/things/:name/:id', function(req, res) {
  res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

// Route handler that sends the response
app.get('/things', function(req, res){
  res.send('Things');
});

app.post("/hello", function(req, res){
  res.send("You Just called the post method at /hello/")
})

app.get('/:id', function(req, res){
  res.send('The id you specified is ' + req.params.id);
});

app.get("/", function(req, res) {
  res.render("index");
})

// Other routes here
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);