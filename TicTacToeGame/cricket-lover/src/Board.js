import React from 'react';
import './Board.css';

const Tile = ({ tileId, onClick, tileDetails }) => {
  return (
    <div className="tile" tile_id={tileId} onClick={() => onClick(tileId)}>
      {tileDetails}
    </div>
  );
};

const Board = ({ boardDetails, onClick }) => {
  const tiles = [];
  for (let index = 0; index <= 8; index++) {
    tiles.push(
      <Tile
        tileId={index}
        tileDetails={boardDetails[index]}
        onClick={onClick}
        key={index}
      />
    );
  }
  return <div className="board">{tiles}</div>;
};

export default Board;
