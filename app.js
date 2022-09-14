const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const timeout = require('connect-timeout');

// Initialize DB:
require('./initDB')();

// Captcha:
const { captcha } = require('./captcha');

captcha('test');

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
  rank: Number,
  mustCaptcha: Boolean,
  captcha: Array,
  nextCaptcha: Number
});

const Sibling = mongoose.model('Sibling', siblingsSchema);

//* GET Root "/" route
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

//* POST '/' Route:
app.post('/', timeout('1s'), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  const siblingName = req.body.theSibling;
  
  // TEST CAPTCHA: 
  // updateCaptcha(siblingName, 20);

  // Send data to be tested to saveVote:
  saveVote(siblingName, 1, (err, data) => {
    if(err) return next(err);
    if(req.timedout) return;
  });
});

//! Helper Functions//
//* Function to save a new vote for appropriate sibling:
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

//* Send to error handler if no timeout:
function haltOnTimedout(req, res, next) {
  if(!req.timedout) next();
}

//* Save vote on a timeout:
function saveVote (name, vote, cb) {
  setTimeout(() => {
    cb(saveNewVote(name, vote) >>> 0) // Pass in name and vote for a new vote to be saved
  }, (1000) >>> 0
)}

//! Captcha functions: //

//* Handle when to show the captcha modal:
//TODO: Figure out how to get info and based on that info, add other info...
function checkCaptcha(name) {
  Sibling.findOne({name: name})
}

//* Handle updating new captcha details in db collection
function updateCaptcha(name, num) {
  const captchaNums = divideNum(num);
  const nextCaptchaNum = getRandomNum(50, 1500); 
  Sibling.findOneAndUpdate({
    name: name,
  }, {
    'captcha': captchaNums,
    'nextCaptcha': nextCaptchaNum
  }, (err, res) => {
    if(err) {
      console.log(err);
    } else {
      console.log('New captcha keys added.');
    }
  })
}

//* Function to return two random numbers that equal total argument value
function divideNum(num) {
  const numArr = [];
  const randomNum = Math.ceil(Math.random() * num);
  if(num - randomNum !== 0) {
    const remainder = num - randomNum;  
    numArr.push(randomNum, remainder);
  } else { // Divide down the middle when there is no remainder
    numArr.push(num/2, num/2);
    return numArr;
  }
  return numArr; 
}

//* Function to return a randomly generated number between min and max
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//! Error Handlers: //

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

//! Port //
app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000...');
});
