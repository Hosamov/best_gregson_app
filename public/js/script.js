let siblings = [
    {
      name: 'Roy',
      voteCount: 0,
    },
    {
      name: 'Sally',
      voteCount: 3,
    },
    {
      name: 'Jason',
      voteCount: 0,
    },
    {
      name: 'Jonny',
      voteCount: 0,
    },
    {
      name: 'Nathan',
      voteCount: 0,
    },
    {
      name: 'Abby',
      voteCount: 0,
    },
    {
      name: 'Kenny',
      voteCount: 0,
    },
    {
      name: 'Charles',
      voteCount: 0,
    },
    {
      name: 'Reuben',
      voteCount: 0,
    },
    {
      name: 'Jesse',
      voteCount: 0,
    },
    {
      name: 'Savannah',
      voteCount: 0
    },
    {
      name: 'Bailey',
      voteCount: 0
    }
];


function updateVoteCount(sibling, voteCount) {
  const voteCountSibling = document.getElementById(`vote-count-${sibling.toLowerCase()}`);
  voteCountSibling.innerHTML = voteCount;
}

const button = document.getElementsByTagName('button');

for(let i = 0; i < button.length; i++) {
  button[i].addEventListener('click', () => {
    // console.log(siblings[i].name);

    button[i].className === siblings[i].name ? (
      siblings[i].voteCount++,
      updateVoteCount(siblings[i].name, siblings[i].voteCount)
    ) : console.log("I can't find that sibling");
  })
}
