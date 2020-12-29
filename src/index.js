import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import calculateWinner from './gameLogic';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}


function Board(props) {
  const renderRow = (i) => {
    return (
      <div key={i} className="board-row">
        {[...new Array(15).keys()].map(num =>
          <Square key={num + i}
            value={props.squares[num + i]}
            onClick={() => props.onClick(num + i)} />)}
      </div>
    );
  };

  return (
    <div>
      {[...new Array(15).keys()].map(num => renderRow(num * 15))}
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([new Array(15 * 15).fill(null)]);
  // const [status, setStatus] = useState("Next Player: X");
  const [xIsNext, setxIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [stepNumber, setStepNumber] = useState(0);
  const [winStep, setWinStep] = useState(0);
  const handleClick = (i) => {
    const hisCopy = history.slice(0, stepNumber + 1);
    const squCopy = [...hisCopy[hisCopy.length - 1]];
    if (squCopy[i] || winner) return;
    squCopy[i] = xIsNext ? "X" : "O";
    setHistory([...hisCopy, squCopy]);
    setxIsNext(!xIsNext);
    const winStatus = calculateWinner(squCopy, i);
    setWinner(winStatus);
    setStepNumber(hisCopy.length);
    setWinStep(null);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext(step % 2 === 0);

    if (step !== stepNumber && winner) { // Remember the win step
      setWinStep({ step:stepNumber, winner: winner});
      setWinner(null);
    } else if (winStep && step === winStep.step) {
      setWinner(winStep.winner);
    }
  };

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });


  const status = winner ? "Winner: " + winner : "Next Player: " + (!xIsNext ? "X" : "O");

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[stepNumber]}
          onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{moves}</div>
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