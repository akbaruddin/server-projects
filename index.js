const express = require("express");
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const app = express();

require('dotenv').config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(bodyParser.json());

app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.set('views','./views');

app.get("/", function(req, res) {
  res.render("index");
})

app.post("/api/one-tap-authentication", async function(req, res) {
  const ticket = await client.verifyIdToken({
    idToken: req.body.credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  if (!payload) {
    return res.status(500).json({ message: "Ops, something gone" })
  }

  res.status(200).json(payload);
})

// Other routes here
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});

app.listen(5000);