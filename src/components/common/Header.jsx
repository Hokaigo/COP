import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useUIStore } from "../../store/ui/uiStore.js"

export default function Header() {
    const { currentUser, logout } = useAuth();
    const openSettings = useUIStore((state) => state.openSettings);

    return (
        <header className="app-header sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-extrabold transition-colors"><span className="brand">Sudoku Game</span></Link>

                <div className="flex items-center gap-2">
                    <button onClick={openSettings}
                            className="px-3 py-1.5 rounded-md bg-indigo-600/90 hover:bg-indigo-500/90 text-sm font-medium transition shadow-sm">
                        Settings
                    </button>

                    {currentUser ? (
                        <>
                            <Link to={`/profile/${currentUser.id}`}
                                className="px-3 py-1.5 rounded-md bg-blue-600/90 hover:bg-blue-500/90 text-sm font-medium transition">
                                Profile
                            </Link>
                            <button onClick={logout}
                                className="px-3 py-1.5 rounded-md bg-red-600/90 hover:bg-red-500/90 text-sm font-medium transition">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"
                                className="px-3 py-1.5 rounded-md bg-blue-600/90 hover:bg-blue-500/90 text-sm font-medium transition">
                                Login
                            </Link>
                            <Link to="/register"
                                className="px-3 py-1.5 rounded-md bg-emerald-600/90 hover:bg-emerald-500/90 text-sm font-medium transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
