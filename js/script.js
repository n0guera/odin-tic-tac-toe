const playerNameContainer = document.querySelector('#player-name-container');
const playerName = document.querySelector('#player-name');
const playBtn = document.querySelector('#play-btn');
const playersDisplay = document.querySelector('#players-display');
const boardContainer = document.querySelector('#board-container');
const board = [];

const createPlayer = (name, mark) => ({ name, mark });

const gameBoard = (() => {
  const createCell = (mark) => ({ mark });

  const createGameBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board.push(createCell(''));
    }
    board.forEach(() => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      boardContainer.appendChild(cellDiv);
    });
  };
  return { createGameBoard };
})();

playBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const player = createPlayer(playerName.value);

  playerNameContainer.style.display = 'none';

  const displayName = document.createElement('h3');
  displayName.textContent = player.name;
  playersDisplay.appendChild(displayName);

  const displayVersus = document.createElement('h3');
  displayVersus.textContent = 'vs';
  playersDisplay.appendChild(displayVersus);

  const displayOpponentName = document.createElement('h3');
  displayOpponentName.textContent = 'AI';
  playersDisplay.appendChild(displayOpponentName);

  gameBoard.createGameBoard();
});
