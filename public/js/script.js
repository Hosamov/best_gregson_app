window.onload = setTimeout(function() {
  console.log('Refreshing browser...');
  location.reload();
}, 30000);


// Sibling with highest vote count gets the crown
const ranks = document.getElementById('ranks');
ranks.firstElementChild.innerText = "1 👑";


// Update vote count displayed to user:
function updateVoteCount(sibling, voteCount, add) {
  const voteCountSibling = document.getElementById(`vote-count-${sibling.toLowerCase()}`);
  if(add) {
    voteCountSibling.innerHTML = +voteCount+1;
  } else {
    voteCountSibling.innerHTML = voteCount;
  }
}

const button = document.getElementsByTagName('button');

for(let i = 0; i < button.length; i++) {

  // Target vote count cell of each sibling:
  const siblingNames = document.querySelectorAll('.sibling-name');
  const voteCountSibling = document.getElementById(`vote-count-${siblingNames[i].innerText.toLowerCase()}`);

  button[i].addEventListener('click', () => {
    button[i].className === siblingNames[i].innerText ? (
      updateVoteCount(siblingNames[i].innerText, voteCountSibling.textContent, true)
    ) : console.log("I can't find that sibling");
  });
}
