export default function StartPage({ onStart }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16">
            <h1 className="text-4xl font-bold text-indigo-400 mb-6">Welcome to the Sudoku game!</h1>
            <button onClick={onStart}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-lg transition-transform active:scale-95">
                Start new game
            </button>
        </div>
    );
}
