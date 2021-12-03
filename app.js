const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const { siblings } = require('./data.json'); //serve data.json as an object

// Initialize DB:
require('./initDB')();

const app = express();

app.set('view engine', 'pug'); // Using pug template

//setup static middleware to serve static files in the public folder
app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Mongoose schema for the siblings app
const siblingsSchema = new mongoose.Schema ({
  name: String,
  voteCount: Number,
  rank: Number
});

const Sibling = mongoose.model('Sibling', siblingsSchema);

// Root "/" Directory
app.get('/', (req, res, next) => {
  let votes = [];
  // Search mongoDB collection:
  Sibling.find({voteCount: {$gte: 0}}, (err, siblings) => {
    // siblings.forEach(sibling => {
    //   if(sibling.voteCount > 0 && sibling.voteCount )
    // })

    res.render('home', { siblings }); // Render home template, passing in siblings data
  }).sort({voteCount: -1});
});

app.post('/', (req, res) => {
  const siblingName = req.body.theSibling;

  // Increment votecount by 1 for selected sibling:
  Sibling.findOneAndUpdate({name: siblingName}, {$inc : { 'voteCount': 1}}, {new: true}, (err, res) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`Successfully incremented a new vote to sibling ${siblingName}`);
    }
  });
});

// Admin/testing purposes only
app.get('/resetallvotes', (req, res) => {
  Sibling.updateMany({}, {'voteCount': 0}, (err, res) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`Successfully reset all sibling votecounts...`);
    }
  })
  res.redirect('/');
});

//404 error handler
app.use((req, res, next) => {
  //Create a new the error class object
  const err = new Error()
  err.message = `It appears the page you requested doesn't exist.`;
  err.status = 404;

  // Log out the error code, and stack to the console, including message
  console.log('Error status code: ' + err.status);
  console.log(err.stack);

  //render the page-not-found template
  res.status(404).render('page-not-found'); //display a generic 404 page without error stack
});

app.listen(8000, () => {
  console.log('Server running on port 8000...');
});
