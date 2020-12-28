import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}


function Board() {
  const [status, setStatus] = useState("Next Player: X");
  const [xIsNext, setxIsNext] = useState(true);
  const [squares, setSquares] = useState(new Array(15 * 15).fill(null));
  const handleClick = (i) => {
    const squCopy = [...squares];
    if (squCopy[i]) return;
    squCopy[i] = xIsNext? "X" : "O";
    setSquares(squCopy);
    setxIsNext(!xIsNext);
    setStatus("Next Player: " + (!xIsNext? "X" : "O"));
  };

  const renderRow = (i) => {
    return (
      <div key={i} className="board-row">
        {[...new Array(15).keys()].map(num =>
          <Square key={num + i}
            value={squares[num + i]}
            onClick={() => handleClick(num + i)} />)}
      </div>
    );
  };

  return (
    <div>
      <div className="Status">{status}</div>
      {[...new Array(15).keys()].map(num => renderRow(num * 15))}
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board/>
      </div>
      <div className="game-info">
        <div>{/** status */}</div>
        <div>{/** TODO */}</div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
