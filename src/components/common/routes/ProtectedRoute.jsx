import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";

export default function ProtectedRoute(){
    const { currentUser, isLoading } = useAuth();

    if(isLoading){
        return <p className="text-center">Checking authentication...</p>;
    }

    return currentUser ? <Outlet/> : <Navigate to="/login" replace />
}