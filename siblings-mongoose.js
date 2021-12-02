// File for storing new sibling data
// Added through app.js (cut&paste)

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

Sibling.insertMany(defaultItems, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully saved default items to DB.");
  }
});
