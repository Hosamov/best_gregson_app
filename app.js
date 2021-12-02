const express = require('express');
const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
const { siblings } = require('./data.json'); //serve data.json as an object

// Initialize DB:
require('./initDB')();

const app = express();

app.set('view engine', 'pug'); // Using pug template

//setup static middleware to serve static files in the public folder
app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res, next) => {
  res.render('home', { siblings });
});


//404 error handler
app.use((req, res, next) => {
  //Create a new the error class object
  const err = new Error()
  err.message = `It appears the page you requested doesn't exist.`;
  err.status = 404;

  //log out the error code, and stack to the console, including message
  console.log('Error status code: ' + err.status);
  console.log(err.stack);

  //render the page-not-found template
  res.status(404).render('page-not-found'); //display a generic 404 page without error stack
});



app.listen(8000, () => {
  console.log('Server running on port 8000...');
});
