const symbols = ['🐶','🐶','🐱','🐱','🐰','🐰','🦊','🦊','🐸','🐸','🐼','🐼','🐵','🐵','🐯','🐯'];
let moves = 0;
let firstCard = null;
let lockBoard = false;
let matched = 0;
let startTime = null;
let timerInterval;

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart');
const darkToggle = document.getElementById('dark-mode-toggle');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  board.innerHTML = '';
  moves = 0;
  matched = 0;
  firstCard = null;
  lockBoard = false;
  movesDisplay.textContent = "Moves: 0";
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);

  const shuffled = shuffle([...symbols]);
  shuffled.forEach(sym => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = sym;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.textContent = this.dataset.symbol;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  moves++;
  movesDisplay.textContent = `Moves: ${moves}`;

  if (this.dataset.symbol === firstCard.dataset.symbol) {
    firstCard = null;
    matched += 2;
    if (matched === symbols.length) {
      clearInterval(timerInterval);
      alert(`🎉 You won in ${moves} moves and ${timerDisplay.textContent.split(' ')[1]}!`);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      this.textContent = '';
      this.classList.remove('flipped');
      firstCard.textContent = '';
      firstCard.classList.remove('flipped');
      firstCard = null;
      lockBoard = false;
    }, 1000);
  }
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.textContent = `Time: ${elapsed}s`;
}

restartBtn.addEventListener('click', startGame);

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

startGame();
