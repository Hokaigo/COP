import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx"
import StartPage from "./pages/StartPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ResultPage from './pages/ResultPage.jsx';
import {useState} from "react";

export default function App() {
    const [page, setPage] = useState('start');
    const [lastResult, setLastResult] = useState(null);

    function moveTo(page){
        setPage(page);
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 container py-4 app-container">
                {page === 'start' && <StartPage onStart={() => moveTo('game')} />}
                {page === 'game' && (
                    <MainPage onShowResult={(resultData) => {
                            setLastResult(resultData || { score: 0 });
                            moveTo('result');
                        }}
                        onBackToStart={() => moveTo('start')}
                    />
                )}
                {page === 'result' && (
                    <ResultPage result={lastResult} onPlayAgain={() => moveTo('game')} onBackToStart={() => moveTo('start')} />
                )}
            </main>
            <Footer />
        </div>
    );
}