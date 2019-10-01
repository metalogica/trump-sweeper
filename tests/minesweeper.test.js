const Minesweeper = require('../lib/minesweeper.js');

describe('Minesweeper()', () => {
  let minesweeper = new Minesweeper();

  it('exists', () => {
    expect(minesweeper).not.toBe(null)
  });
});
