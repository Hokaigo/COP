import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

/**
 * AuthProvider Component.
 * Провайдер контексту авторизації. Відповідає за перевірку JWT токена при завантаженні додатка,
 * збереження стану поточного користувача та надання функцій для входу (login) і виходу (logout).
 *
 * @component
 * @name AuthProvider
 * @param {Object} props - Властивості компонента.
 * @param {React.ReactNode} props.children - Дочірні елементи, які отримають доступ до контексту авторизації.
 * @returns {React.ReactElement} Повертає обгортку `<AuthContext.Provider>`.
 */
export function AuthProvider({ children }) {
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

/**
 * Кастомний хук для доступу до стану та методів авторизації.
 *
 * @function useAuth
 * @name useAuth
 * @returns {Object} Об'єкт контексту авторизації.
 * @property {Object|null} currentUser - Дані поточного користувача або null.
 * @property {boolean} isLoading - Прапорець стану перевірки токена при першому завантаженні.
 * @property {Function} login - Метод для виконання входу.
 * @property {Function} logout - Метод для виходу.
 * @throws {Error} Викидає помилку, якщо використовується поза межами `<AuthProvider>`.
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be inside the provider");
    }
    return context;
}