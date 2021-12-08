window.onload = setTimeout(function() {
  console.log('Refreshing browser...');
  location.reload();
}, 30000);

// Sibling with highest vote count gets the crown
const ranks = document.getElementById('ranks');
ranks.firstElementChild.innerHTML = `1 <img src="../images/crown.png" class="img-crown">`;

// Update vote count displayed to user:
function updateVoteCount(sibling, voteCount, add) {
  const voteCountSibling = document.getElementById(`vote-count-${sibling.toLowerCase()}`);
  if (add) {
    voteCountSibling.innerHTML = +voteCount + 1;
  } else {
    voteCountSibling.innerHTML = voteCount;
  }
}

const button = document.getElementsByTagName('button');
const siblingNames = document.querySelectorAll('.sibling-name');
const siblingArr = []; // For storing all sibling names (used in random functionality)

for (let i = 0; i < button.length; i++) {
  siblingArr.push(siblingNames[i].innerText);

  // Target vote count cell of each sibling:
  const voteCountSibling = document.getElementById(`vote-count-${siblingNames[i].innerText.toLowerCase()}`);

  button[i].addEventListener('click', () => {
    button[i].className === siblingNames[i].innerText ? (
      updateVoteCount(siblingNames[i].innerText, voteCountSibling.textContent, true)
    ) : console.log("I can't find that sibling");
  });
}

let randNum = Math.floor(Math.random() * siblingArr.length);
let randName = siblingArr[randNum];

// Dynamically add random-btn HTML:
const randomVote = document.querySelector('.random-vote');
randomVote.insertAdjacentHTML('afterbegin',`
  <form action="/" method="post">
    <button type="submit" class="random-btn" name="theSibling" value=${randName}>Cast Random Vote</button>
  <form>`);

const randomBtn = document.querySelector('.random-btn');
// Keep name random in random-btn element:
setInterval(() => {
  randNum = Math.floor(Math.random() * siblingArr.length);
  randName = siblingArr[randNum];
  randomBtn.value=randName;
},500);

// Update vote count for random sibling, targeting random-btn element
randomBtn.addEventListener('click', () => {
  const newVoteCount = document.getElementById(`vote-count-${randName.toLowerCase()}`);
  updateVoteCount(randName, newVoteCount.textContent, true)
})
