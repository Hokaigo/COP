import { useState } from "react";
import Board from "../components/Board.jsx";

const boardSeed =[
    [6,null,null,1,5,4,null,null,null],
    [3,null,null,2,null,4,null,9,null],
    [null,1,null,null,null,6,null,4,null],
    [2,6,null,null,1,null,8,null,3],
    [5,null,null,null,null,null,9,2,4],
    [null,null,3,9,null,null,null,null,5],
    [1,3,null,6,null,2,null,null,null],
    [9,4,6,8,3,1,7,null,null],
    [7,null,null,null,4,9,null,1,null]
];

export default function MainPage({ onShowResult, onBackToStart}){
    const [board] = useState(boardSeed);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 board-card p-3 rounded">
                <button className="btn-lg btn btn-secondary me-2" onClick={onBackToStart}>To main page</button>
                <button className="btn-lg btn btn-success" onClick={onShowResult}>Show result</button>
            </div>


            <div className="card sudoku mb-3">
                <Board board={board}/>
            </div>
        </div>
    );
}