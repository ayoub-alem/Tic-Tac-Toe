//Select My Div Blocks where i insert X/O
let items = document.querySelectorAll('.item');
//Select My first Input where player one insert his name
let input1 = document.querySelectorAll('input')[0];
//Select My second Input where player two insert his name
let input2 = document.querySelectorAll('input')[1];
//Select all span elements in my html body
let spans = document.querySelectorAll('span');
//Select the div block that appears after one the player wins
let replayBlock = document.querySelector('.finish');
//Select the replay button inside the div block
let replayButton = document.querySelector('.replay');
//Select the span of the score from the spans array
let scoreSpane = spans[5];
//Create an object called playerOne to put all the playerOne informations
let playerOne = {
  playerOneSpan: spans[3],
  playerOneTurn: spans[4],
  playerName: 'Player 1',
  score: 0,
};

//Create an object called playerTwo to put all the playerTwo informations
let playerTwo = {
  playerTwoSpan: spans[7],
  playerTwoTurn: spans[8],
  playerName: 'Player 2',
  score: 0,
};

//Boolean to specified thet turn  : turn === true --> playerOne    $$$   turn === false ---> playerTwo
let turn = true;

//function tha check if the content of the block that you gave it there indexes wether
//they have the same character or not : X/O
function areThree(Up, i, j, k) {
  return Up[i] == Up[j] && Up[j] == Up[k];
}

//function that checks if the textContent of the given block is X
function isX(Up, i) {
  return Up[i] === '×';
}

//function that checks if the textContent of the given block is O
function isO(Up, i) {
  return Up[i] === 'O';
}

//function that checks if there is a winner after each round
function checkWinner() {
  let Up = [];
  items.forEach(function (item) {
    Up.push(item.textContent);
  });

  if (areThree(Up, 0, 1, 2)) {
    if (isX(Up, 0)) return win([0, 1, 2], playerOne, playerTwo);
    if (isO(Up, 0)) win([0, 1, 2], playerTwo, playerOne);
  } else if (areThree(Up, 0, 3, 6)) {
    if (isX(Up, 0)) return win([0, 3, 6], playerOne, playerTwo);
    if (isO(Up, 0)) return win([0, 3, 6], playerTwo, playerOne);
  } else if (areThree(Up, 0, 4, 8)) {
    if (isX(Up, 0)) return win([0, 4, 8], playerOne, playerTwo);
    if (isO(Up, 0)) return win([0, 4, 8], playerTwo, playerOne);
  } else if (areThree(Up, 1, 4, 7)) {
    if (isX(Up, 1)) return win([1, 4, 7], playerOne, playerTwo);
    if (isO(Up, 1)) return win([1, 4, 7], playerTwo, playerOne);
  } else if (areThree(Up, 2, 5, 8)) {
    if (isX(Up, 2)) return win([2, 5, 8], playerOne, playerTwo);
    if (isO(Up, 2)) return win([2, 5, 8], playerTwo, playerOne);
  } else if (areThree(Up, 3, 4, 5)) {
    if (isX(Up, 3)) return win([3, 4, 5], playerOne, playerTwo);
    if (isO(Up, 3)) return win([3, 4, 5], playerTwo, playerOne);
  } else if (areThree(Up, 6, 7, 8)) {
    if (isX(Up, 6)) return win([6, 7, 8], playerOne, playerTwo);
    if (isO(Up, 6)) return win([6, 7, 8], playerTwo, playerOne);
  } else if (areThree(Up, 2, 4, 6)) {
    if (isX(Up, 2)) return win([2, 4, 6], playerOne, playerTwo);
    if (isO(Up, 2)) return win([2, 4, 6], playerTwo, playerOne);
  } else if (checkDraw()) {
    draw();
  }
}

//Adding a click event to each block to insert X/O
items.forEach(function (item) {
  item.addEventListener('click', insertXO);
});

//Function that decide to inert X/O
function insertXO(e) {
  //first we check if there is already a textContent if yes we return None;
  if (e.target.textContent === '×' || e.target.textContent === 'O') return;
  //if it's playerOne turn we insert X in the clicked block;
  if (turn) {
    //we insert the animation class for a beautiful animation
    e.target.classList.add('animation');
    e.target.textContent = '×';
    playerOne.playerOneTurn.classList.add('urTurn');
    playerTwo.playerTwoTurn.classList.remove('urTurn');
    //give the turn to playerTwo
    turn = !turn;
  } else {
    e.target.classList.add('animation');
    e.target.textContent = 'O';
    e.target.style.paddingTop = '-30px';
    playerTwo.playerTwoTurn.classList.add('urTurn');
    playerOne.playerOneTurn.classList.remove('urTurn');
    //give the turn to playerOne
    turn = !turn;
  }
  checkWinner();
}

function checkDraw() {
  let isDraw = true;
  items.forEach((item) => {
    if (item.textContent === '') {
      isDraw = false;
    }
  });
  return isDraw;
}

function draw() {
  let windowsVoice = window.speechSynthesis;
  var a = new SpeechSynthesisUtterance('Draw');
  setTimeout(() => {
    console.log(window.speechSynthesis.getVoices());
    a.voice = windowsVoice.getVoices()[6];
    console.log(a.voice);
    windowsVoice.speak(a);
    replayBlock.style.transform = 'scale(1)';
  }, 10);
  items.forEach((item) => {
    item.removeEventListener('click', insertXO);
  });
}

//add a click event to replay Button
replayButton.addEventListener('click', resetBlocks);

//reset the blocks
function resetBlocks() {
  replayBlock.style.transform = 'scale(0)';
  items.forEach((item) => {
    item.innerHTML = '';
    item.addEventListener('click', insertXO);
    item.style.border = '4px solid #4b4848e3';
    item.style.color = 'white';
    item.classList.remove('animation');
  });
}

function win(line, playerWinner, playerLoser) {
  playerWinner.score++;
  scoreSpane.innerHTML = `${playerOne.score} : ${playerTwo.score}`;
  for (let index = 0; index < line.length; index++) {
    const itemInedx = line[index];
    items[itemInedx].style.color = '#7CFC00';
    items[itemInedx].style.borderColor = '#7CFC00';
  }
  let windowsVoice = window.speechSynthesis;
  var a = new SpeechSynthesisUtterance(
    `The winner is ${playerWinner.playerName}, Hard luck ${playerLoser.playerName}`
  );
  setTimeout(() => {
    console.log(window.speechSynthesis.getVoices());
    a.voice = windowsVoice.getVoices()[6];
    console.log(a.voice);
    windowsVoice.speak(a);
    replayBlock.style.transform = 'scale(1)';
  }, 10);
  items.forEach((item) => {
    item.removeEventListener('click', insertXO);
  });
}

input1.addEventListener('input', changePlayer1Name);
function changePlayer1Name(e) {
  if (e.target.value === '') return;
  playerOne.playerOneSpan.innerHTML = e.target.value;
  playerOne.playerName = e.target.value;
}
input2.addEventListener('input', changePlayer2Name);
function changePlayer2Name(e) {
  if (e.target.value === '') return;
  playerTwo.playerTwoSpan.innerHTML = e.target.value;
  playerTwo.playerName = e.target.value;
}
