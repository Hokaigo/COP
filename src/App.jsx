import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx"
import StartPage from "./pages/StartPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import {useState} from "react";
import {SettingsProvider} from "./contexts/SettingsContext.jsx";
import SettingsModal from "./components/common/modal/SettingsModal.jsx";
import GameResultsModal from "./components/common/modal/GameResultsModal.jsx";

export default function App() {
    const [page, setPage] = useState('start');
    const [lastResult, setLastResult] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [gameResultsOpen, setGameResultsOpen] = useState(false);

    const [replayKey, setReplayKey] = useState(0);

    function moveTo(page){
        setPage(page);
    }

    return (
        <SettingsProvider>
            <div className="d-flex flex-column min-vh-100">
                <Header onOpenSettings={() => setSettingsOpen(true)} />
                <main className="flex-grow-1 container py-4 app-container">
                    {page === 'start' && <StartPage onStart={() => moveTo('game')} />}
                    {page === 'game' && (
                        <MainPage key={replayKey} isSettingsOpen={settingsOpen} onShowResult={(resultData) => {
                                setLastResult(resultData || { score: 0 });
                                setGameResultsOpen(true);
                            }}
                            onBackToStart={() => moveTo('start')}
                        />
                    )}
                </main>
                <Footer />
            </div>

            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

            <GameResultsModal isOpen={gameResultsOpen} result={lastResult}
                              onPlayAgain={ ()=> { setReplayKey(k=>k+1); setGameResultsOpen(false);}}
                              onBackToMain={ ()=> { setGameResultsOpen(false); moveTo('start') }}/>
        </SettingsProvider>
    );
}