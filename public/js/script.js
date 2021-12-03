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
      console.log(siblingNames[i].innerText, siblingNames[i].innerText, voteCountSibling.textContent),
      updateVoteCount(siblingNames[i].innerText, voteCountSibling.textContent, true)
    ) : console.log("I can't find that sibling");
  });
}

const btnJonny = document.querySelector('.Jonny');
console.log(btnJonny);

// const reloadIcon = document.querySelector('.refresh-page');
//
// // When refresh icon is clicked, reload page every 10s
// reloadIcon.addEventListener('click', () => {
//   setInterval(function() {
//     console.log('Refreshing page...');
//     location.reload();
//   }, 10000)
// });
