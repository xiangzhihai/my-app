import { useState } from 'react';
import calculateWinner from './gameLogic';
import Board from "./board"
export default function Game() {
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
            setWinStep({ step: stepNumber, winner: winner });
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