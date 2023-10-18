document.addEventListener('DOMContentLoaded', () => {
    const GRID_WIDTH = 10
    const GRID_HEIGHT = 20
    const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT
  
    
    const grid = createGrid();
    let squares = Array.from(grid.querySelectorAll('div'))
    const startBtn = document.querySelector('.button')
    const hamburgerBtn = document.querySelector('.toggler')
    const menu = document.querySelector('.menu')
    const span = document.getElementsByClassName('close')[0]
    const scoreDisplay = document.querySelector('.score-display')
    const linesDisplay = document.querySelector('.lines-score')
    let currentIndex = 0
    let currentRotation = 0
    const width = 10
    let score = 0
    let lines = 0
    let timerId
    let nextRandom = 0
    const colors = [
      'url(images/blue_block.png)',
      'url(images/pink_block.png)',
      'url(images/purple_block.png)',
      'url(images/peach_block.png)',
      'url(images/yellow_block.png)'
    ]
  
  
    function createGrid() {
     
      let grid = document.querySelector(".grid")
      for (let i = 0; i < GRID_SIZE; i++) {
        let gridElement = document.createElement("div")
        grid.appendChild(gridElement)
      }
  
      
      for (let i = 0; i < GRID_WIDTH; i++) {
        let gridElement = document.createElement("div")
        gridElement.setAttribute("class", "block3")
        grid.appendChild(gridElement)
      }
  
      let previousGrid = document.querySelector(".previous-grid")
      
      for (let i = 0; i < 16; i++) {
        let gridElement = document.createElement("div")
        previousGrid.appendChild(gridElement);
      }
      return grid;
    }
  
  
  
    function control(e) {
      if (e.keyCode === 39)
        moveright()
      else if (e.keyCode === 38)
        rotate()
      else if (e.keyCode === 37)
        moveleft()
      else if (e.keyCode === 40)
        moveDown()
    }
  
    document.addEventListener('keydown', control)
  
   
    const lTetromino = [
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
      [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]
  
    const zTetromino = [
      [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
      [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
      [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
      [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
    ]
  
    const tTetromino = [
      [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
      [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
      [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ]
  
    const oTetromino = [
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ]
  
    const iTetromino = [
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
    ]
  
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
  
    
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]
  
  
    
    let currentPosition = 4
   
    function draw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.add('block')
        squares[currentPosition + index].style.backgroundImage = colors[random]
      })
    }
  
    function undraw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('block')
        squares[currentPosition + index].style.backgroundImage = 'none'
      })
    }
  
   
    function moveDown() {
      undraw()
      currentPosition = currentPosition += width
      draw()
      freeze()
    }
  
    startBtn.addEventListener('click', () => {
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        displayShape()
      }
    })
  
    
    function moveright() {
      undraw()
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
      if (!isAtRightEdge) currentPosition += 1
      if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition -= 1
      }
      draw()
    }
  
   
    function moveleft() {
      undraw()
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
      if (!isAtLeftEdge) currentPosition -= 1
      if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        currentPosition += 1
      }
      draw()
    }
  
    
    function freeze() {
     
      if (current.some(index => squares[currentPosition + index + width].classList.contains('block3') || squares[currentPosition + index + width].classList.contains('block2'))) {
        
        current.forEach(index => squares[index + currentPosition].classList.add('block2'))
        
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
      }
    }
    freeze()
  
   
    function rotate() {
      undraw()
      currentRotation++
      if (currentRotation === current.length) {
        currentRotation = 0
      }
      current = theTetrominoes[random][currentRotation]
      draw()
    }
  
   
    function gameOver() {
      if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)
      }
    }
  
    
    const displayWidth = 4
    const displaySquares = document.querySelectorAll('.previous-grid div')
    let displayIndex = 0
  
    const smallTetrominoes = [
      [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
      [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
      [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
      [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
    ]
  
    function displayShape() {
      displaySquares.forEach(square => {
        square.classList.remove('block')
        square.style.backgroundImage = 'none'
      })
      smallTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('block')
        displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom]
      })
    }
  
    
    function addScore() {
      for (currentIndex = 0; currentIndex < GRID_SIZE; currentIndex += GRID_WIDTH) {
        const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9]
        if (row.every(index => squares[index].classList.contains('block2'))) {
          score += 10
          lines += 1
          scoreDisplay.innerHTML = score
          linesDisplay.innerHTML = lines
          row.forEach(index => {
            squares[index].style.backgroundImage = 'none'
            squares[index].classList.remove('block2') || squares[index].classList.remove('block')
  
          })
         
          const squaresRemoved = squares.splice(currentIndex, width)
          squares = squaresRemoved.concat(squares)
          squares.forEach(cell => grid.appendChild(cell))
        }
      }
    }
  
    
    hamburgerBtn.addEventListener('click', () => {
      menu.style.display = 'flex'
    })
    span.addEventListener('click', () => {
      menu.style.display = 'none'
    })
  
  })