// Refresh page every 30 seconds by default:
window.onload = setInterval(function() {
  console.log('Refreshing page...');
  location.reload();
}, 10000);

// Sibling names for verification purposes:
let siblings = [
    {
      name: 'Roy',
    },
    {
      name: 'Sally',
    },
    {
      name: 'Jason',
    },
    {
      name: 'Jonny',
    },
    {
      name: 'Nathan',
    },
    {
      name: 'Abby',
    },
    {
      name: 'Kenny',
    },
    {
      name: 'Charles',
    },
    {
      name: 'Reuben',
    },
    {
      name: 'Jesse',
    },
    {
      name: 'Savannah',
    },
    {
      name: 'Bailey',
    }
];

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
