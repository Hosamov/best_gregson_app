const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const timeout = require('connect-timeout');

// Initialize DB:
require('./initDB')();

const app = express();

app.set('view engine', 'pug'); // Using pug template

//setup static middleware to serve static files in the public folder
app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Mongoose schema for the siblings app
const siblingsSchema = new mongoose.Schema({
  name: String,
  voteCount: Number,
  rank: Number
});

const Sibling = mongoose.model('Sibling', siblingsSchema);

// Root "/" Directory
app.get('/', (req, res, next) => {
  // Search mongoDB collection:
  Sibling.find({
    voteCount: {
      $gte: 0
    }
  }, (err, siblings) => {
    res.render('home', {
      siblings
    }); // Render home template, passing in siblings data
  }).sort({
    voteCount: -1
  });
});

// TODO: Serve CPM to DB, use data from DB for CAPTCHA modal.

app.post('/', timeout('5s'), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  const siblingName = req.body.theSibling;
  
  // Send data to be tested to saveVote:
  saveVote(siblingName, 1, (err, data) => {
    if(err) return next(err);
    if(req.timedout) return;
  });
});

// Function to save a new vote for appropriate sibling:
function saveNewVote(name, voteCount) {
  Sibling.findOneAndUpdate({
    name: name
    }, {
      $inc: {
        'voteCount': voteCount
      }
    }, {
      new: true
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully incremented a new vote to sibling ${name}`);
      }
  });
}

// Send to error handler if no timeout:
function haltOnTimedout(req, res, next) {
  if(!req.timedout) next();
}

// Save vote on a timeout:
function saveVote (name, vote, cb) {
  setTimeout(() => {
    cb(saveNewVote(name, vote) >>> 0) // Pass in name and vote for a new vote to be saved
  }, (10000) >>> 0
)}

// Admin/testing purposes only
app.get('/resetallvotes', (req, res, next) => {
  Sibling.updateMany({}, {
    'voteCount': 0
  }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully reset all sibling votecounts...`);
    }
  })
  res.redirect('/');
});

// Admin/testing purposes only
app.get('/nopejonny', (req, res, next) => {
  Sibling.updateOne({
    name: 'Jonny'
  }, {
    'voteCount': 6139
  }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully reset Jonny's votecounts...`);
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

// Global error handler
app.use((err, req, res, next) => {
  if(err) {
    if(err.status === 404) {
       res.status(404).render('page_not_found', { err }); //render the error status with the error stack
    } else {
      err.message = err.message; //|| "Oops, it looks like something went wrong on the server...";
      // res.status(err.status || 500).render('error', { err }); //display the error status and render the error template w/ error message/object
      console.log(err.status);
      console.log(err.message);
      res.redirect('/'); // Redirect back to / get route
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000...');
});
