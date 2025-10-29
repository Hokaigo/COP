import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";

export default function Header( {onOpenSettings} ) {
    const { currentUser, logout } = useAuth();

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="navbar-brand fw-bold fs-2 text-decoration-none">Sudoku game</Link>
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-info" onClick={onOpenSettings}>Settings</button>

                    {currentUser ? (
                        <>
                            <Link to={`/profile/${currentUser.id}`} className="btn btn-sm btn-primary">Profile</Link>
                            <button className="btn btn-sm btn-danger" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
                            <Link to="/register" className="btn btn-sm btn-success">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
