window.onload = setTimeout(function() {
  console.log('Refreshing browser...');
  location.reload();
}, 300000); // Refresh page every 5 minutes

// Sibling with highest vote count gets the crown
const ranks = document.getElementById('ranks');
ranks.firstElementChild.innerHTML = `1 <img src="../images/crown.png" class="img-crown">`;

// Update vote count displayed to user (in real time):
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
let clicks = 0;
let clickStart = clicks;

for (let i = 0; i < button.length; i++) {
  siblingArr.push(siblingNames[i].innerText);
  // Target vote count cell of each sibling:
  const voteCountSibling = document.getElementById(`vote-count-${siblingNames[i].innerText.toLowerCase()}`);
  
  button[i].addEventListener('click', () => {
    clicks++;
    button[i].className === siblingNames[i].innerText ? (
      updateVoteCount(siblingNames[i].innerText, voteCountSibling.textContent, true)
    ) : console.log("I can't find that sibling");
  });
}

let randNum = Math.floor(Math.random() * siblingArr.length);
let randName = siblingArr[randNum];

// Dynamically add random-btn to template:
const randomVote = document.querySelector('.random-vote');
randomVote.insertAdjacentHTML('afterbegin',`
  <form action="/" method="post">
    <button type="submit" class="random-btn" name="theSibling" value=${randName}>Cast Random Vote</button>
  <form>`);

const randomBtn = document.querySelector('.random-btn');
// Update random name on a constant basis:
setInterval(() => {
  randNum = Math.floor(Math.random() * siblingArr.length);
  randName = siblingArr[randNum];
  randomBtn.value=randName;
},250);

// Update vote count for random sibling, targeting random-btn element
randomBtn.addEventListener('click', () => {
  const newVoteCount = document.getElementById(`vote-count-${randName.toLowerCase()}`);
  updateVoteCount(randName, newVoteCount.textContent, true)
})

// Function to check if clicks are 390+ in a 1 minute timeframe
function clickChecker() {
  let captchaKeys = captchaGenerator(); // TODO: Put this in an object?
  let timer = setInterval(function(){myTimer()}, 60000);

  const myTimer = () => {
    const clickEnd = clicks;
    const cpm = clickEnd - clickStart;
    if(cpm >= 390) {
      displayModalwindow(captchaKeys[0], captchaKeys[1], captchaKeys[2]);
      
    }
    clickStart = clickEnd; // Set clickStart to clickEnd last
    captchaKeys = captchaGenerator(); // Reset captcha keys
  }
}

// TODO: Add captcha data to function, allow for user calculation.
function displayModalwindow(cap1, cap2, capSum) {
  modal.insertAdjacentHTML('beforeend', `
    <div class="modal-container">
        <div class="modal">
          
            <h2>CAPTCHA</h2>
            <p id="modal-instructions">Please answer the following question:</p>
            <br>
            <p>What is ${cap1} + ${cap2}?</p>
            <input type="text" id="id-answer">

            <button type="button" id="modal-submit-btn" class="modal-submit-btn">Submit answer</button>
        </div>
    `);

  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const modalInstructions = document.getElementById('modal-instructions');
  const modalDiv = document.querySelector('.modal');

  modalSubmitBtn.addEventListener('click', () => {
    const inputAnswer = document.getElementById('id-answer').value;
    if(+inputAnswer === capSum) {
      modalDiv.innerHTML = '<h2 class="thankyou">Thank you.</h2>'
      setTimeout(()=> {
        modal.lastElementChild.remove(); //exit out of modal window
      }, 1000);
      
    } else {
      modalInstructions.innerHTML = 'That answer is incorrect. Please try again.';
    }
  });
}

function captchaGenerator() {
  const captchaArr = [];
  const num1 = Math.ceil(Math.random() * 99);
  const num2 = Math.ceil(Math.random() * 9);
  captchaArr.push(num1, num2, num1+num2);
  return captchaArr;
}

clickChecker();