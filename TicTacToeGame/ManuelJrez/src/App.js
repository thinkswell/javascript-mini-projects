import './App.css'
import * as React from 'react'

function useLocalStorageState(
    key,
    defaultValue = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {},
  ) {
    const [state, setState] = React.useState(() => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })
  
    const prevKeyRef = React.useRef(key)
  
    React.useEffect(() => {
      const prevKey = prevKeyRef.current
      if (prevKey !== key) {
        window.localStorage.removeItem(prevKey)
      }
      prevKeyRef.current = key
      window.localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])
  
    return [state, setState]
  }

function Board({ squares, onClick }) {
  function renderSquare(i) {
    return (
      <button className="square" style={{ width: "33.33%", height: 150, fontSize: 65 }} onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="board-row" style={{ flex: 1 }}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row" style={{ flex: 1 }}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row" style={{ flex: 1 }}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    </div>
  )
}

function Game() {
    const initialSquares = Array(9).fill(null)
    const [squares, setSquares] = useLocalStorageState('board', initialSquares)
    const [history, setHistory] = useLocalStorageState('history', squares)

    const nextValue = calculateNextValue(squares)
    const winner = calculateWinner(squares)
    const status = calculateStatus(winner, squares, nextValue)

    function selectSquare(square) {
        const squareValue = squares[square]
        if (squareValue || winner) return

        const nextSquares = [...squares]
        nextSquares[square] = nextValue

        setSquares(nextSquares)

        const nextHistory = [...history]
        nextHistory.push(nextSquares)
        setHistory(nextHistory)
    }

    function restart() {
        setSquares(initialSquares)
        setHistory([])
    }
    const moves = history.map((stepSquares, step) => {
        const desc = step ? `Go to move #${step}` : 'Go to game start'
        const isCurrentStep = squares.length === history.length
        return (
            <li key={step}>
            <button disabled={isCurrentStep} onClick={() => setSquares(stepSquares)}>
                {desc} {isCurrentStep ? '(current)' : null}
            </button>
            </li>
        )
    })
    return (
        <div className="game" style={{ display: "flex" }}>
            <div className="game-board" style={{ flex: 0.5 }}>
                <Board onClick={selectSquare} squares={squares} />
                <button className="restart" onClick={restart}>
                    restart
                </button>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
