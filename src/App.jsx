import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import StartPage from "./pages/StartPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import { useState } from "react";
import SettingsModal from "./components/common/modal/SettingsModal.jsx";
import GameResultsModal from "./components/common/modal/GameResultsModal.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import GuestRoute from "./components/common/routes/GuestRoute.jsx";
import ProtectedRoute from "./components/common/routes/ProtectedRoute.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
    const [replayKey, setReplayKey] = useState(0);
    const navigate = useNavigate();

    return (
        <AuthProvider>
                <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
                    <Header />

                    <main className="flex-grow flex flex-col justify-center container mx-auto px-4 py-6 max-w-6xl">
                        <Routes>
                            <Route path="/" element={<StartPage onStart={() => navigate("/game")} />}/>

                            <Route path="/game" element={<MainPage key={replayKey} onBackToStart={() => navigate("/")}/> }/>

                            <Route element={<GuestRoute />}>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                            </Route>

                            <Route element={<ProtectedRoute />}>
                                <Route path="/profile/:id" element={<ProfilePage />} />
                            </Route>

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>

                    <Footer />
                </div>

                <SettingsModal />

                <GameResultsModal onPlayAgain={() => {
                        setReplayKey((k) => k + 1);
                        navigate("/game");
                    }}
                    onBackToMain={() => {
                        navigate("/");
                    }}
                />
        </AuthProvider>
    );
}
