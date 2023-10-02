import { useState } from "react";
import Card from '../Cards/Card' ;
import isWinner from '../Helpers/Winner';
import './Grid.css';

function Grid({numberofCards}) {
  const [board, setBoard] = useState(Array(numberofCards).fill(""))
  const [turn , setTurn] = useState(true) //true => 0 false => X
  const [winner, setWinner] = useState(null)

  function play(index) {
    if(turn == true){
        board[index] = "O" 
    } else{
        board[index] = "X"
    }
    const win = isWinner(board, turn ? 'O' : 'X');
    if(win) {
      setWinner(win)
    }
    setBoard([...board])
    setTurn(!turn)
  }
  function reset() {
    setTurn(true)
    setBoard(Array(numberofCards).fill(""))
    setWinner(null)
  }
  return(
    <div className="grid-wrapper">
    {
        winner && (
                <>
                   <h1 className="turn-highlight" style={{color : "white"}}>Winner is {winner}</h1>
                   <button className="reset" onClick={reset}>Reset Game</button>
                </>
            )
    }
    <h1 className="turn-highlight" style={{color : "white"}}>Current Turn: {(turn) ? 'O' : 'X'}</h1>
        <div className="grid">
        {board.map((el, idx)=> <Card gameEnd={winner ? true : false} key={idx} onPlay={play} player={el} index={idx} />)}
     </div>
    </div>
    
  )
}

export default Grid;