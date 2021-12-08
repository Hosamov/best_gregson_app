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

for (let i = 0; i < button.length; i++) {

  // Target vote count cell of each sibling:

  const voteCountSibling = document.getElementById(`vote-count-${siblingNames[i].innerText.toLowerCase()}`);

  button[i].addEventListener('click', () => {
    button[i].className === siblingNames[i].innerText ? (
      updateVoteCount(siblingNames[i].innerText, voteCountSibling.textContent, true)
    ) : console.log("I can't find that sibling");
  });
}

const refreshContainer = document.querySelector('.refresh');
refreshContainer.insertAdjacentHTML('afterbegin',`<button class="random-btn" id="random-btn">Cast Random Vote</button>`);
const randomBtn = document.getElementById('random-btn');

// Cast random vote:
randomBtn.addEventListener('click', () => {
  const randomVote = Math.floor(Math.random() * 12);
  const randomVoteCount = document.getElementById(`vote-count-${siblingNames[randomVote].innerText.toLowerCase()}`);
  updateVoteCount(siblingNames[randomVote].innerText, randomVoteCount.textContent, true);
});
