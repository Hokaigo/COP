import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx"
import StartPage from "./pages/StartPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import {useState} from "react";
import {SettingsProvider} from "./contexts/SettingsContext.jsx";
import SettingsModal from "./components/common/modal/SettingsModal.jsx";
import GameResultsModal from "./components/common/modal/GameResultsModal.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import GuestRoute from "./components/common/routes/GuestRoute.jsx";
import ProtectedRoute from "./components/common/routes/ProtectedRoute.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
    const [lastResult, setLastResult] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [gameResultsOpen, setGameResultsOpen] = useState(false);
    const [replayKey, setReplayKey] = useState(0);
    const navigate = useNavigate();

    return (
        <AuthProvider>
            <SettingsProvider>
                <div className="d-flex flex-column min-vh-100">
                    <Header onOpenSettings={() => setSettingsOpen(true)} />
                    <main className="flex-grow-1 container py-4 app-container d-flex flex-column justify-content-center">
                        <Routes>
                            <Route path="/" element={ <StartPage onStart={() => navigate('/game')} /> } />
                            <Route path="/game"
                                   element={ <MainPage key={replayKey} isSettingsOpen={settingsOpen}
                                                       onShowResult={(resultData) => {
                                                           setLastResult(resultData || { score: 0 });
                                                           setGameResultsOpen(true);
                                                       }} onBackToStart={() => navigate('/')}/> } />
                            <Route element={<GuestRoute />}>
                                <Route path="/login" element={ <LoginPage /> } />
                                <Route path="/register" element={ <RegisterPage /> } />
                            </Route>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/profile/:id" element={ <ProfilePage /> } />
                            </Route>

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>

                <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

                <GameResultsModal isOpen={gameResultsOpen} result={lastResult}
                                  onPlayAgain={ ()=> { setReplayKey(k=>k+1); setGameResultsOpen(false);
                                  navigate('/game') }}
                                  onBackToMain={ ()=> { setGameResultsOpen(false); navigate("/") }}/>
            </SettingsProvider>
        </AuthProvider>
    );
}