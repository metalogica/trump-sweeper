const toggleCell = (cell) => {
  cell.classList.remove('unopened');
  cell.classList.add('opened');
}

const checkAdjacentCells = (cell) => {
  const cellIndex = cell.cellIndex;
  const cellRow = cell.parentElement.rowIndex;
  console.log(cellIndex, cellRow);
}

const click = (cell) => {
  if (cell.classList.contains('mine')) {
    console.log('you lose!');
  } else {
    console.log('skin in the game!');
    toggleCell(cell);
    checkAdjacentCells(cell);
  }
}

const unopened = document.querySelectorAll('.unopened');
unopened.forEach(cell => {
  cell.addEventListener('click', (event) => {
    click(cell);
  })
});
