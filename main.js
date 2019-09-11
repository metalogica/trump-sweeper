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
  return [c1,c2,c3,c4,c5,c6,c7,c8].filter(c => c !== null)
}

const checkAdjacentCells = (cell) => {
  // Select the x8 adjacent cells of 'cell'.
  let clickedX = cell.parentElement.rowIndex;
  let clickedY = cell.cellIndex;
  let adjacentCells = [];

  console.log(getAdjacentCells(cell));

  // console.log(cell.getAttribute('id'));
  // console.log(clickedX, clickedY);

  // condition = true
  // while some cell in the entire table is such that:
    // it has an adjacent cell such that:
      // It is both NOT-opened AND has no adjacent mine && has no adjacent-numbered-cell
  // if (condition) {
  //   // execute the checker function again and update the array.
  //   // checkAdjacentCells(newCell);
  // } else {
  //   // end the function
  // }
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

// Code for cell indices
// const cellIndex = cell.cellIndex;
// const cellRow = cell.parentElement.rowIndex;
// console.log(cellIndex, cellRow);
