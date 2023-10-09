import {
	generateEmptyWellGrid,
	isPositionAvailable,
	rotate,
	fitTetrominoWithinBoundaries,
	hasLineToClear,
	clearLines,
  transferTetroGridIntoWell
} from '../utils'

import { SHAPES } from '../constants/tetromino'

let emptyGrid = Array(10).fill([]).map(r => Array(10).fill(null))

let grid =  [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null,null,null,'#f9b26c',null,null,null,null],
  [null,null,'#24c4a0','#24c4a0',null,'#f9b26c','#f9b26c','#f9b26c',null,'#67b0d4'],
  [null,'#24c4a0','#24c4a0',null,'#f6d42b','#f6d42b',null,null,null,'#67b0d4'],
  [null,'#24c4a0','#24c4a0',null,'#f6d42b','#f6d42b','#f9b26c','#f9b26c','#f9b26c','#67b0d4'],
  ['#24c4a0','#24c4a0',null,null,'#67b0d4','#67b0d4','#67b0d4','#67b0d4','#f9b26c','#67b0d4']
]

it('generates an empty grid of 10x10', () => {
	expect(generateEmptyWellGrid(10, 10)).toEqual(emptyGrid)
})

it('rotates a 2d array', () => {
	// rotate: transpose and reverse each row
	const rotatedT = [
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	]
	const rotatedJ = [
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	]
	expect(rotate(SHAPES.T)).toEqual(rotatedT)
	expect(rotate(SHAPES.J)).toEqual(rotatedJ)
})

it('detects if the next drop position is available', () => {
  let currTetrominoGrid = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
  let pos1 = { x: 3, y: 14 }
  let pos2 = { x: 3, y: 13 }

  expect(isPositionAvailable(grid, currTetrominoGrid, pos1)).toEqual(false)
  expect(isPositionAvailable(grid, currTetrominoGrid, pos2)).toEqual(true)
})

it('determines whether if there is a full line in the well grid', () => {
  expect(hasLineToClear(grid)).toEqual(false)
  
  let gridWithFullLine = grid.map((row, i) => {
    // make a full line at the end of the grid
    return i === grid.length - 1 ? Array(grid[0].length).fill('#000') : row
  })

  expect(hasLineToClear(gridWithFullLine)).toEqual(true)
})

it('transfer the tetro grid into the well grid', () => {
  let tetroGrid = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
  let tetroPosition = { x: 2, y: 13}
  
  let newGrid = [...grid]
  newGrid[14] = [null, null, '#aaa', '#aaa', '#aaa', '#aaa', null, null, null, null],

  expect(transferTetroGridIntoWell({
    grid: newGrid,
    tetroGrid,
    tetroPosition,
    color: '#aaa'
  })).toEqual(newGrid)
})
