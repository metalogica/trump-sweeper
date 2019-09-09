const toggleCell = (cell) => {
  cell.classList.remove('unopened');
  cell.classList.add('opened');
}

const checkAdjacentCells = (cell) => {
  // const cellIndex = cell.cellIndex;
  // const cellRow = cell.parentElement.rowIndex;
  // console.log(cellIndex, cellRow);

  // Select the x8 adjacent cells of 'cell'.
  let adjacentCells = document.querySelectorAll('');

  condition = true
  // while some cell in the entire table is such that:
    // it has an adjacent cell such that:
      // It is both NOT-opened AND has no adjacent mine && has no adjacent-numbered-cell
  if (condition) {
    // execute the checker function again and update the array.
    // checkAdjacentCells(newCell);
  } else {
    // end the function
  }
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
