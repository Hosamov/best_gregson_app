const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

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

app.post('/', (req, res, next) => {
  const siblingName = req.body.theSibling;
  const voteCount = req.body.voteCount;

  const sendUpdate = new Promise((resolve, reject) => {
    if(res.statusCode >= 200 && res.statusCode < 300) {
      const findSibling = () => {
        Sibling.findOneAndUpdate({
          name: siblingName
        }, {
          $inc: {
            'voteCount': 1
          }
        }, {
          new: true
        }, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Successfully incremented a new vote to sibling ${siblingName}`);
          }
        });
      }
      return resolve(findSibling());
    } else {
      const why = 'Server Response Error.';
      return reject(why);
    }
  });
  
  // const sendUpdate = () => {
  //   // Increment votecount by 1 for selected sibling:
  //   Sibling.findOneAndUpdate({
  //     name: siblingName
  //   }, {
  //     $inc: {
  //       'voteCount': 1
  //     }
  //   }, {
  //     new: true
  //   }, (err, res) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(`Successfully incremented a new vote to sibling ${siblingName}`);
  //     }
  //   });
  // }

  const checkIfComplete = () => {
    sendUpdate
      .then(ok => {
        console.log('OK');
      })
      .catch(err => {
        console.log(err);
      })
  };

  checkIfComplete();

  // setTimeout(sendUpdate, 1000);
});

// Admin/testing purposes only
app.get('/resetallvotes', (req, res) => {
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
app.get('/nopejonny', (req, res) => {
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

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000...');
});
