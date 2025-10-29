export default function StartPage({ onStart }) {
    return (
        <div className="page-placeholder text-light">
            <h1>Welcome to the Sudoku game!</h1>
            <div>
                <button className="btn btn-primary" onClick={onStart}>Start new game</button>
            </div>
        </div>
    );
}
