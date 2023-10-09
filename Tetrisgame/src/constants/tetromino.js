export const TETROMINOS = ['I', 'O', 'T', 'J', 'L', 'S', 'Z']
export const COLORS = {
  I: '#67b0d4',
  O: '#f6d42b',
  T: '#fcbab8',
  J: '#f9b26c',
  L: '#7a4084',
  S: '#24c4a0',
  Z: '#e84138'
}

export const NEXT_TETRO_COLOR = '#54b5cd'

// the shape of each tetro
export const SHAPES = {
  I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[1, 1, 0], [1, 1, 0]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
}
