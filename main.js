const toggleCell = (cell) => {
  cell.classList.remove('unopened');
  cell.classList.add('opened');
}

const getAdjacentCells = (cell) => {
  let c1 = document.getElementById(`${cell.parentElement.rowIndex - 1}-${cell.cellIndex + 1}`);
  let c2 = document.getElementById(`${cell.parentElement.rowIndex}-${cell.cellIndex + 1}`);
  let c3 = document.getElementById(`${cell.parentElement.rowIndex + 1}-${cell.cellIndex + 1}`);
  let c4 = document.getElementById(`${cell.parentElement.rowIndex - 1}-${cell.cellIndex}`);
  let c5 = document.getElementById(`${cell.parentElement.rowIndex + 1}-${cell.cellIndex}`);
  let c6 = document.getElementById(`${cell.parentElement.rowIndex - 1}-${cell.cellIndex - 1}`);
  let c7 = document.getElementById(`${cell.parentElement.rowIndex}-${cell.cellIndex - 1}`);
  let c8 = document.getElementById(`${cell.parentElement.rowIndex + 1}-${cell.cellIndex - 1}`);
  return [c1,c2,c3,c4,c5,c6,c7,c8].filter(c => c !== null);
}

const checkAdjacentCells = (cellArray, currentCell) => {
  let mineCount = 0;
  cellArray.forEach(cell => {
    if (cell.classList.contains('mine')) { mineCount += 1; }
  });
  if (mineCount > 0) { currentCell.classList.add(`mine-neighbour-${mineCount}`); }
  return cellArray.filter(c => !c.classList.contains('mine') && c.classList.contains('unopened') && !c.classList.contains(/neighbour/));
}

const hasMine = cell => cell.classList.contains('mine');

const click = (cell) => {
  if (hasMine(cell)) {
    cell.classList.remove('unopened')
    cell.classList.add('explosion');
    cell.classList.add('mine-show');
  } else {
    toggleCell(cell);
    adjacentCells = getAdjacentCells(cell);
    newArr = checkAdjacentCells(adjacentCells, cell);
    if (newArr.length > 0) {
      newArr.forEach(c => click(c))
    }
  }
}

const unopened = document.querySelectorAll('.unopened');
unopened.forEach(cell => {
  cell.addEventListener('click', (event) => {
    click(cell);
  })
});

// Code for cell indices
// const cellIndex = cell.cellIndex;
// const cellRow = cell.parentElement.rowIndex;
// console.log(cellIndex, cellRow);
