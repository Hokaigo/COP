import {useAuth} from "../../../contexts/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function GuestRoute(){
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/" replace /> : <Outlet/>
}