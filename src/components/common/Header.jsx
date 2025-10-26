export default function Header( {onOpenSettings} ) {
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="navbar-brand fw-bold fs-2">Sudoku Game</div>
                <div>
                    <button className="btn btn-sm btn-info" onClick={onOpenSettings}>Settings</button>
                </div>
            </div>
        </header>
    );
}
