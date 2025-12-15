import  {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token){
            try{
                const decodedToken = jwtDecode(token);
                if(decodedToken.exp * 1000 > Date.now()){
                    setCurrentUser({ id: decodedToken.data.userId });
                } else{
                    localStorage.removeItem('token');
                }
            } catch{
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false)
    }, []);

    const login = useCallback((token, user) =>{
        localStorage.setItem('token', token);
        setCurrentUser(user);
        navigate("/")
    }, [navigate]);

    const logout = useCallback(()=>{
       localStorage.removeItem('token');
       setCurrentUser(null);
       navigate('/');
    }, [navigate]);

    return <AuthContext.Provider value={{ currentUser, isLoading, login, logout}}>{!isLoading && children}</AuthContext.Provider>
}

export function useAuth(){
    const context = useContext(AuthContext);
    if (!context){
        if (!context) throw new Error("useAuth must be inside the provider");
    }
    return context;
}