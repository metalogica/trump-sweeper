const difficulty = parseInt(prompt("Please select a difficulty rating: '1' for easy, '2' for hard."), 10);
const grid = document.getElementById('root');
const row = `<tr></tr>`;
const tile = `<td class="unopened"></td>`;

const errorMessage = () => {
  const refreshButton = `<p>Sorry, you need to enter a valid response.</p>
  <button id="refreshButton">Try Again</button>`;
  grid.insertAdjacentHTML('beforeend', refreshButton)
  document.getElementById('refreshButton').addEventListener('click', () => {
    window.location.reload();
  })
}

const buildGrid = (grid, row, tile, size, mines) => {
  let currentRow, currentTile;
  for (let k = 1; k <= size; k++) {
    grid.insertAdjacentHTML('afterbegin', row);
    currentRow = document.querySelector('#root tr:nth-last-of-type(n)');
    // currentRow.classList.add(`row-${k}`);
    for (let i = 1; i <= size; i ++) {
      currentRow.insertAdjacentHTML('afterbegin', tile);
      currentTile = document.querySelector('#root tr:nth-last-of-type(n) td:nth-last-of-type(n)');
      // currentTile.classList.add(`col-${i}`);
      currentTile.setAttribute('id', `row-${k}-col-${i}`)
    }
  }

  // Put this into a for loop inside a 'build mines' function.
  let randTileId, rand, minesArray = [];
  let allTiles = Array.from(document.querySelectorAll('td'));
  rand = Math.floor(Math.random() * allTiles.length + 1);
  if (rand === 0) {
    randTileId = allTiles.slice(0,1);
    randTileId = randTileId[0].id;
  } else {
    randTileId = allTiles.slice(rand-1, rand);
    randTileId = randTileId[0].id;
  }
  randTile = document.getElementById(randTileId);
  randTile.classList.add('mine');
}


switch (difficulty) {
  case 1:
    buildGrid(grid, row, tile, 2, 1);
    break;
  case 2:
    buildGrid(grid, row, tile, 5, 3);
    break;
  default:
    errorMessage();
    break;
}

const gameEngine = new Map();


