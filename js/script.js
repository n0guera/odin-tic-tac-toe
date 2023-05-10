const playerNameContainer = document.querySelector('#player-name-container');
const playerName = document.querySelector('#player-name');

const matchInfo = document.querySelector('#match-info');
matchInfo.style.display = 'none';
const playersDisplay = document.querySelector('#players-display');

const boardContainer = document.querySelector('#board-container');

const createPlayer = (name, mark, canPlay) => ({ name, mark, canPlay });

let player1 = createPlayer();
let player2 = createPlayer();

const displayName = document.createElement('h3');
playersDisplay.appendChild(displayName);

const displayVersus = document.createElement('h3');
displayVersus.textContent = 'vs';
playersDisplay.appendChild(displayVersus);

const displayOpponentName = document.createElement('h3');
playersDisplay.appendChild(displayOpponentName);

const board = [];

let gameStart = false;

const gameBoard = (() => {
  const createCell = (mark) => ({ mark });

  const createGameBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board.push(createCell(''));
    }
    board.forEach((cell, index) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.setAttribute('id', `cell-${index}`);
      boardContainer.appendChild(cellDiv);
    });
  };

  return { createGameBoard };
})();

const Game = (() => {
  const handleClick = (e) => {
    const cellIndex = parseInt(e.target.id.split('-')[1], 10);

    const updateCell = () => {
      if (board[cellIndex].mark === 'X') {
        e.target.textContent = 'X';
      }
      if (board[cellIndex].mark === 'O') {
        e.target.textContent = 'O';
      }
    };
    board[cellIndex].mark = player1.mark;
    updateCell();
  };

  const start = () => {
    gameBoard.createGameBoard();

    if (board !== '') {
      gameStart = true;
    }
    if (gameStart === true) {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.addEventListener('click', handleClick);
      });
    }
  };

  return { start };
})();

const playBtn = document.querySelector('#play-btn');
playBtn.addEventListener('click', () => {
  playerNameContainer.style.display = 'none';

  player1 = createPlayer(playerName.value, 'X', true);
  displayName.textContent = player1.name;
  player2 = createPlayer('AI', 'O', false);
  displayOpponentName.textContent = player2.name;

  matchInfo.style.display = 'block';

  Game.start();
});
