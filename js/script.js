const playerNameContainer = document.querySelector('#player-name-container');
const playerName = document.querySelector('#player-name');

const matchInfo = document.querySelector('#match-info');
matchInfo.style.display = 'none';
const playersDisplay = document.querySelector('#players-display');

const boardContainer = document.querySelector('#board-container');

const createPlayer = (name, mark) => ({ name, mark });

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

const players = [];

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
  let cells;

  const update = () => {
    for (let i = 0; i < gameBoard.cells.length; i += 1) {
      gameBoard.cells[i].textContent = board[i].mark;
    }
  };

  return { createGameBoard, cells, update };
})();

const Game = (() => {
  let currentTurn = true;
  let currentPlayer;

  const handleClick = (e) => {
    const cellIndex = parseInt(e.target.id.split('-')[1], 10);
    currentPlayer = currentTurn ? players[0] : players[1];

    const switchTurn = () => {
      currentTurn = !currentTurn;
      currentPlayer = currentTurn ? players[0] : players[1];
    };

    const addMark = () => {
      if (board[cellIndex].mark !== '') {
        return;
      }
      board[cellIndex].mark = currentPlayer.mark;
      gameBoard.update();
      switchTurn();
    };

    const computerPlay = () => {
      const freeCells = board.filter((cell) => cell.mark === '');
      const randomCell =
        freeCells[Math.floor(Math.random() * freeCells.length)];
      const randomCellIndex = board.indexOf(randomCell);
      board[randomCellIndex].mark = currentPlayer.mark;
      gameBoard.update();
      switchTurn();
    };

    const checkWin = () => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      winningCombinations.forEach((combination) => {
        const [a, b, c] = combination;
        const markA = board[a].mark;
        const markB = board[b].mark;
        const markC = board[c].mark;

        if (markA !== '' && markA === markB && markA === markC) {
          const winner = currentPlayer;
          alert(`${winner.name} has won!`);
        }
      });
    };

    addMark();
    computerPlay();
    checkWin();
  };

  const start = () => {
    gameBoard.createGameBoard();
    gameBoard.cells = document.querySelectorAll('.cell');
    if (board !== '') {
      gameStart = true;
    }
    if (gameStart === true) {
      gameBoard.cells.forEach((cell) => {
        cell.addEventListener('click', handleClick, { once: true });
      });
    }
  };

  return { start };
})();

const playBtn = document.querySelector('#play-btn');
playBtn.addEventListener('click', () => {
  playerNameContainer.style.display = 'none';

  player1 = createPlayer(playerName.value, 'X');
  displayName.textContent = player1.name;
  players.push(player1);
  player2 = createPlayer('COM', 'O');
  displayOpponentName.textContent = player2.name;
  players.push(player2);

  matchInfo.style.display = 'block';

  Game.start();
});
