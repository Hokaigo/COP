import {useAuth} from "../../../contexts/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

/**
 * GuestRoute Component.
 * Компонент-обгортка для маршрутів, доступних лише неавторизованим користувачам.
 *
 * @component
 * @name GuestRoute
 * @returns {React.ReactElement} Повертає компонент `<Navigate>` для редиректу або `<Outlet>`.
 */
export default function GuestRoute(){
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/" replace /> : <Outlet/>
}