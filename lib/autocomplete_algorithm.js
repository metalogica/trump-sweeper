const openCurrentCell = (cell) => {
  cell.classList.remove('unopened');
  cell.classList.add('opened');
}

const isNeighbour = cell => cell.classList.contains('neighbour');

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

const checkAdjacentCells = (cellArray, currentCell) => {
  let mineCount = 0;
  cellArray.forEach(cell => {
    if (cell.classList.contains('mine')) { mineCount += 1; }
  });
  if (mineCount > 0) { currentCell.classList.add(`mine-neighbour-${mineCount}`, 'neighbour'); }
  return cellArray.filter(c => !c.classList.contains('mine') && c.classList.contains('unopened') && !c.classList.contains('neighbour'));
}

const checkNextCells = (cell) => {
  openCurrentCell(cell);
  adjacentCells = getAdjacentCells(cell);
  nextAdjacentCells = checkAdjacentCells(adjacentCells, cell);
  if (nextAdjacentCells.length > 0 && !isNeighbour(cell)) {
   nextAdjacentCells.forEach(c => click(c));
  }
}

