const playerNameContainer = document.querySelector('#player-name-container');
const playerName = document.querySelector('#player-name');

const matchInfo = document.querySelector('#match-info');
matchInfo.style.display = 'none';

const playersDisplay = document.querySelector('#players-display');

const boardContainer = document.querySelector('#board-container');

const buttonContainer = document.querySelector('#button-container');
const newRoundBtn = document.querySelector('#new-round-btn');
const restartGameBtn = document.querySelector('#restart-btn');

const createPlayer = (name, mark) => ({ name, mark });

let player1 = createPlayer();
let player2 = createPlayer();

const displayPlayerName = document.createElement('h3');
playersDisplay.appendChild(displayPlayerName);

const displayVersus = document.createElement('h3');
displayVersus.textContent = 'vs';
playersDisplay.appendChild(displayVersus);

const displayOpponentName = document.createElement('h3');
playersDisplay.appendChild(displayOpponentName);

const displayResult = document.querySelector('#display-result');

let board = [];

let players = [];

let gameStart = false;
let gameOver = false;

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
  let boardCells;

  const updateBoard = () => {
    for (let i = 0; i < gameBoard.boardCells.length; i += 1) {
      gameBoard.boardCells[i].textContent = board[i].mark;
    }
  };

  const clearBoard = () => {
    boardContainer.innerHTML = '';
  };

  return { createGameBoard, boardCells, updateBoard, clearBoard };
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

    const checkWin = () => {
      if (gameOver) return;

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
          gameOver = true;
          gameBoard.boardCells.forEach((cell) => {
            cell.removeEventListener('click', handleClick, { once: true });
          });
          const winner = currentPlayer;
          const displayWinner = document.createElement('h3');
          displayWinner.setAttribute('id', 'display-winner');
          displayWinner.textContent = `${winner.name} has won!`;
          displayResult.appendChild(displayWinner);
          matchInfo.style.display = 'none';
          displayResult.style.display = 'block';
          buttonContainer.style.display = 'flex';
          const newRound = () => {
            displayResult.textContent = '';
            displayResult.style.display = 'none';
            buttonContainer.style.display = 'none';
            Game.start();
          };
          newRoundBtn.addEventListener('click', newRound);
          const restartGame = () => {};
          restartGameBtn.addEventListener('click', restartGame);
        }
      });
    };

    const computerPlay = () => {
      const freeCells = board.filter((cell) => cell.mark === '');
      const randomCell =
        freeCells[Math.floor(Math.random() * freeCells.length)];
      const randomCellIndex = board.indexOf(randomCell);
      board[randomCellIndex].mark = currentPlayer.mark;
      gameBoard.updateBoard();
      checkWin();
      switchTurn();
    };

    const addMark = () => {
      if (board[cellIndex].mark !== '') {
        return;
      }
      board[cellIndex].mark = currentPlayer.mark;
      gameBoard.updateBoard();
      checkWin();
      switchTurn();
      computerPlay();
    };

    addMark();
  };

  const start = () => {
    board = [];
    players = [];
    gameBoard.clearBoard();
    gameStart = false;
    gameOver = false;
    playerNameContainer.style.display = 'none';

    player1 = createPlayer(playerName.value, 'X');
    displayPlayerName.textContent = player1.name;
    players.push(player1);
    player2 = createPlayer('COM', 'O');
    displayOpponentName.textContent = player2.name;
    players.push(player2);

    matchInfo.style.display = 'block';
    gameBoard.createGameBoard();
    gameBoard.boardCells = document.querySelectorAll('.cell');
    if (board !== '') {
      gameStart = true;
    }
    if (gameStart === true) {
      gameBoard.boardCells.forEach((cell) => {
        cell.addEventListener('click', handleClick, { once: true });
      });
    }
  };

  return { start };
})();

const playBtn = document.querySelector('#play-btn');
playBtn.addEventListener('click', () => {
  Game.start();
});
