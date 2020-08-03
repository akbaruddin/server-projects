# Express server

## Install

```bash
# make directory
mkdir <my_project> && cd <my_project>

# create package.json with default props
pnpm init -y

# install expressjs
pnpm i express

# development package
pnpm i -D nodemon
```

## Setup

Create `index.js`

```javascript
const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Hello world!");
})

app.listen(3000);
```

### RUN

Add `start` in `package.json`
```javascript
"script": {
    "start": "nodemon index.js"
}
```

Start Projects
```bash
pnpm start
```

`app.get(route, callback)`

This function tells what to do when a get requests at the given route is called.
The callback function has 2 parameters, request(req) and response(res).

`res.send()`

This function takes ad objects as input and it sends this to the requesting client.
Here we aare sending the string `"Hello World"`

`app.listen(port, [host], [backlog], [callback])`

| Title        | Details                                                      |
| ------------ | ------------------------------------------------------------ |
| **port**     | A port number on which the server should accopt incoming requests |
| **host**     | Name of the domain. We need to set it when you deploy our apps to the cloud |
| **backlog**  | The maximum number of queued pending connections. The default is 511 |
| **callback** | An asynchronous function that is called when the server starts listening for requests |

## Middleware

Middleware functions are functions that have access to **request object(req)**, **the response object(res)**, and the next middleware function in the application's request-response cycle. These functions are used to modify req and res objects for tasks like parsing request bodies, adding response header, etc.

```javascript
// Middleware function to log request protocol
app.use('/things', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});

// Route handler that sends the response
app.get('/things', function(req, res){
   res.send('Things');
});
```

## Route

`app.method(path, handler)`

This METHOD can be applied to any one of the HTTP verbs - get, set, put, post, delete.

```javascript
app.post("/hello", function(req, res){
  res.send("You Just called the post method at /hello/")
})
```

#### Test

```bash
curl -X POST "http://localhost:3000/hello"
```

### URL binding

We can now define routes, but those are static or fixed. To use the dynamic routes, we SHOULD provide different types of routes. Using dynamic routes allows  us to pass parameters and process based on them.

Example
url: `http://localhost:3000/123`

```javascript
var express = require('express');
var app = express();

app.get('/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});
app.listen(3000);
```

Complex
url: `http://localhost:3000/things/tutorialspoint/12345`

```javascript
var express = require('express');
var app = express();

app.get('/things/:name/:id', function(req, res) {
   res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});
app.listen(3000);
```

## Pattern Matched Routes

we can also use **regex** to restrict URL parameter matching. Let us assume we need the **id** to be a 5-digit long number. We can use the following route definition.

```javascript
var express = require('express');
var app = express();

app.get('/things/:id([0-9]{5})', function(req, res){
   res.send('id: ' + req.params.id);
});

app.listen(3000)
```

`Cannot GET <your-request-route>`

```javascript
var express = require('express');
var app = express();

// Other routes here
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});
app.listen(3000);
```

## Serving static files

Static files are files that clients download as they are from the server. Create a new directory, public. Express, by default does not allow you to serve static files. You need to enable it using the following built-in middleware.

```javascript
app.use(express.static('public'));
```

### Virtual Path Prefix

We can also provide a path prefix for serving static files. For example, if you want to provide a path prefix like '/static', we need to include the following code in our `index.js` file 

```javascript
var express = require('express');
var app = express();

app.use('/static', express.static('public'));

app.listen(3000);
```

## Templating

Pug is a templating engine for Express. Templating engines are used to remove the cluttering of our server code with HTML, concatenating strings wildly to existing HTML templates. Pug is a very powerful templating engine which has a variety of features including filters, includes, inheritance, interpolation, etc. There is a lot of ground to cover on this.

To use Pug with Express, we need to install it,

```bash
pnpm i pug
```

Add the following code to our `index.js` file.

```javascript
app.set('view engine', 'pug');
app.set('views','./views');
```

View Path

```
/views
---/index.pug
```

Create `index.pug` file
```pug
doctype html
html
   head
      title = "Hello Pug"
   body
      p.greetings#people Hello World!
```

Render
```javascript
app.get("/", function(req, res) {
  res.render("index"); // index.pug -> index
})
```

