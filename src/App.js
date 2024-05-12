import React, { useState, useEffect } from 'react';
import blackPawn from './resources/negru.png'
import whitePawn from './resources/alb3.png'; 
import blackRook from './resources/tura.png'; 
import whiteRook from './resources/turaalba.png'; 
import blackKnight from './resources/cal.png'; 
import whiteKnight from './resources/calalb.png'; 
import blackBishop from './resources/bishop.png'; 
import whiteBishop from './resources/bishopalb.png'; 
import blackQueen from './resources/regina.png'; 
import whiteQueen from './resources/reginaalba.png'; 
import blackKing from './resources/rege.png'; 
import whiteKing from './resources/regealb.png'; 

const App = () => {
  const [board, setBoard] = useState([]);
  const [draggingPiece, setDraggingPiece] = useState(null);
  const [initialPosition, setInitialPosition] = useState({ row: null, col: null });

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const initialBoard = [
      [whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop, whiteKnight, whiteRook],
      [whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn],
      [blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop, blackKnight, blackRook]
    ];
    setBoard(initialBoard);
  };

  const handlePieceMouseDown = (row, col) => {
    setDraggingPiece(board[row][col]);
    setInitialPosition({ row, col });
  };

  const handlePieceMouseUp = () => {
    setDraggingPiece(null);
    setInitialPosition({ row: null, col: null });
  };

  const handlePieceDragOver = (event) => {
    event.preventDefault();
  };

  const handlePieceDrop = (row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = draggingPiece;
    newBoard[initialPosition.row][initialPosition.col] = null;
    setBoard(newBoard);
    setDraggingPiece(null);
    setInitialPosition({ row: null, col: null });
  };

  return (
    <div className='chess'>
      <h2>ChessBoard</h2>
      {board.map((row, i) => (
        <div key={`row_${i}`} style={{ display: 'flex' }}>
          {row.map((piece, j) => (
            <div
              key={`piece_${i}_${j}`}
              style={{ width: '100px', height: '100px', position: 'relative', backgroundColor: (i + j) % 2 ? 'black' : 'white' }}
              onMouseDown={() => handlePieceMouseDown(i, j)}
              onMouseUp={handlePieceMouseUp}
              onDragOver={handlePieceDragOver}
              onDrop={() => handlePieceDrop(i, j)}
            >
              {piece && <img src={piece} alt={`Piece_${i}_${j}`} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
