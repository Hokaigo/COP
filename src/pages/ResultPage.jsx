export default function ResultPage({ result, onPlayAgain, onBackToStart }) {
    return (
        <div className="text-center page-placeholder">
            <h2>Result</h2>
            <p className="lead">
                <strong>{result?.correct ?? 0}</strong> / {result?.total ?? 81}
                <br />
                <strong>{result?.score ?? 0}%</strong>
            </p>
            <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-primary" onClick={onPlayAgain}>Play again</button>
                <button className="btn btn-secondary" onClick={onBackToStart}>To main page</button>
            </div>
        </div>
    );
}
