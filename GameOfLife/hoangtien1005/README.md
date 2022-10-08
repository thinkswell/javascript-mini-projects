<h1 align="center">Game of Life</h1>
<p align="center">
    <img src="demo.gif">
</p>

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.

## Rules:
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


## Live demo:
website: [game-of-life-js](https://hoangtien1005.github.io/game-of-life-js/)

## Controls:
- Press **Enter key** to replay
- Press **Space key** to stop/continue the loop
- **Left-click** to revise a dead cell and continue the loop

## Built with:
Javascript (P5.js library), HTML, CSS