// Globals
let gameWon = false;
let gameLost = false;
let globalMineCount = 1;
let flagLimit = globalMineCount;
let currentFlagCount = 0;
let displayFlagCount = document.getElementById('flagCount');
let clock = document.getElementById('clock');
const gameStart = new Date();
// DOM elements
const clock1 = document.getElementById('clock1');
const clock2 = document.getElementById('clock2');
const clock3 = document.getElementById('clock3');

// Clock function
const renderTimer = (time) => {
  let clock = time.split('');

  if (clock.length === 3) {
    clock = [Number(clock[0]), Number(clock[1]), Number(clock[2])];
    clock1.innerText = clock[0];
    clock2.innerText = clock[1];
    clock3.innerText = clock[2];
  } else if (clock.length === 2) {
    clock = [0, Number(clock[0]), Number(clock[1])];
    console.log(clock);
    clock2.innerText = clock[1];
    clock3.innerText = clock[2];
  } else {
    clock = [0, 0, Number(clock[0])];
    clock3.innerText = clock[2];
  }
}
const timer = () => {
  let time = new Date() - gameStart;
  time = `${(time/1000).toFixed(0)}`;
  renderTimer(time);
}
setInterval(() => timer(), 1000);

// Game Init
const updateFlagDisplay = () => displayFlagCount.innerText = flagLimit - currentFlagCount;

const initGlobals = () => {
  updateFlagDisplay();
}
initGlobals()

// Generate board
const buildBoard = () => {
  const boardContainer = document.getElementById('root');
  boardContainer.innerHTML = '';

  var table = [];
  for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
    let row = [`<tr>`,`</tr>`];
    for (let tdIndex = 0; tdIndex < 2; tdIndex++) {
      let td = `<td id="${rowIndex}-${tdIndex}" class="unopened"></td>`;
      row.splice(-1,0,td);
    }
    table.push(row.join(''));
  }
  table = table.join('');
  boardContainer.insertAdjacentHTML('afterbegin', table);
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const setMines = (board) => {
  const cells = Array.from(document.querySelectorAll('td'));
  while (cells.filter(c=>c.classList.contains('mine')).length < globalMineCount) {
    let cell = cells[rand(0,cells.length-1)];
    if (!cell.classList.contains('mine')) { cell.classList.add('mine') }
  }
}

const generateBoard = () => {
  buildBoard();
  setMines();
}
generateBoard();

// Autocomplete Algorithm
const checkNextCells = (cell) => {
  openCurrentCell(cell);
  adjacentCells = getAdjacentCells(cell);
  nextAdjacentCells = checkAdjacentCells(adjacentCells, cell);
  if (nextAdjacentCells.length > 0 && !isNeighbour(cell)) {
   nextAdjacentCells.forEach(c => click(c));
  }
}

const openCurrentCell = (cell) => {
  cell.classList.remove('unopened');
  cell.classList.add('opened');
}

const getAdjacentCells = (cell) => {
  // Get all 8 surrounding cells from the current cell's co-ordinate values.
  let cellX = cell.cellIndex;
  let cellY = cell.parentElement.rowIndex;
  let c1 = document.getElementById(`${cellY - 1}-${cellX + 1}`);
  let c2 = document.getElementById(`${cellY}-${cellX + 1}`);
  let c3 = document.getElementById(`${cellY + 1}-${cellX + 1}`);
  let c4 = document.getElementById(`${cellY - 1}-${cellX}`);
  let c5 = document.getElementById(`${cellY + 1}-${cellX}`);
  let c6 = document.getElementById(`${cellY - 1}-${cellX - 1}`);
  let c7 = document.getElementById(`${cellY}-${cellX - 1}`);
  let c8 = document.getElementById(`${cellY + 1}-${cellX - 1}`);
  return [c1,c2,c3,c4,c5,c6,c7,c8].filter(c => c !== null);
}

const isNeighbour = cell => cell.classList.contains('neighbour');

const checkAdjacentCells = (cellArray, currentCell) => {
  let mineCount = 0;
  cellArray.forEach(cell => {
    if (cell.classList.contains('mine')) { mineCount += 1; }
  });
  if (mineCount > 0) { currentCell.classList.add(`mine-neighbour-${mineCount}`, 'neighbour'); }
  return cellArray.filter(c => !c.classList.contains('mine') && c.classList.contains('unopened') && !c.classList.contains('neighbour'));
}

// Reveal all tiles at end of game
const openAllCellsAtGameEnd = (cell) => {
  openCurrentCell(cell);
  adjacentCells = getAdjacentCells(cell);
  nextAdjacentCells = openAdjacentCellsAtGameEnd(adjacentCells, cell);
  if (nextAdjacentCells.length > 0) {
    nextAdjacentCells.forEach( cell => openAllCellsAtGameEnd(cell));
  }
}

const openAdjacentCellsAtGameEnd = (cellArray, currentCell) => {
  let mineCount = 0;
  cellArray.forEach(cell => {
    if (cell.classList.contains('mine')) { mineCount += 1; }
  });
  if (mineCount > 0 && !currentCell.classList.contains('mine-show')) {
    currentCell.classList.add(`mine-neighbour-${mineCount}`);
  }
  return cellArray.filter(c => c.classList.contains('unopened'));
}



// Flag code
const addFlag = (cell) => {
  if (cell.classList.contains('flagged')) {
    cell.classList.remove('flagged')
    currentFlagCount -= 1;
    updateFlagDisplay();
  } else {
    currentFlagCount < flagLimit ? cell.classList.add('flagged') : alert('Too many flags!');
    currentFlagCount += 1;
    displayFlagCount.innerText = flagLimit - currentFlagCount;
    updateFlagDisplay();
  }
  console.log(currentFlagCount, flagLimit);

  if (currentFlagCount === flagLimit) checkVictory();
}

// Top-Level Code
const hasMine = cell => cell.classList.contains('mine');

const renderMines = (cell) => {
  // Set mine explosion styling for all cells with mines.
  cell.classList.add('explosion', 'opened');
  // Render all cells as opened.
  document.querySelectorAll('.mine').forEach(mine => mine.classList.add('mine-show'));
}

const flagsMatchMines = (flags, mines) => {
  f = Array.from(flags).map(f => f.id).sort();
  m = Array.from(mines).map(f => f.id).sort();
  return String(f) === String(m) ? true : false;
}

const checkVictory = () => {
  let flags = document.querySelectorAll('.flagged');
  let mines = document.querySelectorAll('.mine');
  let flagsEqualMines = flagsMatchMines(flags, mines);

  if (flags.length === mines.length && flagsEqualMines) {
    alert('You win! Now please edit win conditions to reset game.')
    return true;
  }
}

const click = (cell) => {
  if (cell.classList.contains('flagged')) return false;

  if (hasMine(cell)) {
    renderMines(cell);
    openAllCellsAtGameEnd(cell);
  } else {
    // The parent function is recursive function: click() is called within the function below.
    checkNextCells(cell)
  }
}

const unopened = document.querySelectorAll('.unopened');
unopened.forEach(cell => {
  cell.addEventListener('click', (event) => {
    click(cell);
  })
  cell.addEventListener('contextmenu', () => {
    addFlag(cell);
  })
});
