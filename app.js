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
  voteCount: Number
});

const Sibling = mongoose.model('Sibling', siblingsSchema);

const sibling1 = new Sibling ({
  name: 'Roy',
  voteCount: 0
});
const sibling2 = new Sibling ({
  name: 'Sally',
  voteCount: 0
});
const sibling3 = new Sibling ({
  name: 'Jason',
  voteCount: 0
});
const sibling4 = new Sibling ({
  name: 'Jonny',
  voteCount: 0
});
const sibling5 = new Sibling ({
  name: 'Nathan',
  voteCount: 0
});
const sibling6 = new Sibling ({
  name: 'Abby',
  voteCount: 0
});

const sibling7 = new Sibling ({
  name: 'Kenny',
  voteCount: 0
});

const sibling8 = new Sibling ({
  name: 'Charles',
  voteCount: 0
});

const sibling9 = new Sibling ({
  name: 'Reuben',
  voteCount: 0
});

const sibling10 = new Sibling ({
  name: 'Jesse',
  voteCount: 0
});

const sibling11 = new Sibling ({
  name: 'Savannah',
  voteCount: 0
});

const sibling12 = new Sibling ({
  name: 'Bailey',
  voteCount: 0
});

const defaultItems = [sibling1, sibling2, sibling3, sibling4, sibling5,
                      sibling6, sibling7, sibling8, sibling9, sibling10,
                      sibling11, sibling12];
//
// Sibling.insertMany(defaultItems, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved default items to DB.");
//   }
// });

// Root "/" Directory
app.get('/', (req, res, next) => {
  // Search mongoDB collection:
  Sibling.find({}, (err, siblings) => {
    console.log(siblings)
    res.render('home', { siblings }); // Render home template, passing siblings data
  });

});

app.post('/', (req, res) => {
  const siblingName = req.body.theSibling;

  Sibling.findOneAndUpdate({name: siblingName}, {$inc : { 'voteCount': 1}}, {new: true}, (err, res) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`Successfully incremented a new vote to sibling ${siblingName}`);
    }

  });


  // console.log(siblingName);
  // // voteCount
  //
  // Sibling.updateOne({name: siblingName}, {voteCount: `${siblingName.voteCount}`}, (err) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log(`Successfully incremented a new vote to sibling ${siblingName}`);
  //   }
  // })
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

  //log out the error code, and stack to the console, including message
  console.log('Error status code: ' + err.status);
  console.log(err.stack);

  //render the page-not-found template
  res.status(404).render('page-not-found'); //display a generic 404 page without error stack
});



app.listen(8000, () => {
  console.log('Server running on port 8000...');
});
