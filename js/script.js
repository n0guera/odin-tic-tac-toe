const playerNameContainer = document.querySelector('#player-name-container');
const playerName = document.querySelector('#player-name');
const playBtn = document.querySelector('#play-btn');
const matchInfo = document.querySelector('#match-info');
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
  const displayName = document.createElement('h4');
  displayName.textContent = player.name;
  matchInfo.appendChild(displayName);

  gameBoard.createGameBoard();
});
