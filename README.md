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