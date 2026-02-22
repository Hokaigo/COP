import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";

/**
 * ProtectedRoute Component.
 * Компонент-обгортка для маршрутів, доступних лише авторизованим користувачам.
 *
 * @component
 * @name ProtectedRoute
 * @returns {React.ReactElement} Повертає вкладені маршрути `<Outlet>`, редирект або завантаження.
 */
export default function ProtectedRoute(){
    const { currentUser, isLoading } = useAuth();

    if(isLoading){
        return <p className="text-center">Checking authentication...</p>;
    }

    return currentUser ? <Outlet/> : <Navigate to="/login" replace />
}