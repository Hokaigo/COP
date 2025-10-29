import {fetchUserProfile, deleteAllUserStats, deleteSingleUserStat, deleteUserAccount } from "../../utils/userService.js";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {useCallback, useEffect, useState} from "react";

export function useUserProfile(){
    const { id: urlId } = useParams();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const loadProfile = useCallback(async () => {
        if (!currentUser || !urlId) return;

        if (currentUser.id !== Number(urlId)) {
            navigate(`/profile/${currentUser.id}`, { replace: true });
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            logout();
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const data = await fetchUserProfile(urlId, token);
            setUserProfile(data);
        } catch (err) {
            if (err.message === 'Unauthorized') {
                logout();
            } else {
                setError(err.message || "Failed to load profile.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [urlId, currentUser, navigate, logout]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const handleDeleteAllStats = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            logout();
            return;
        }
        const confirmed = window.confirm("Are you sure you want to delete all stats info? This action cannot be undone.");
        if (!confirmed) return;

        setError('');
        try {
            await deleteAllUserStats(token);
            setUserProfile(prev => ({ ...prev, stats: [] }));
        } catch (err) {
            if (err.message === 'Unauthorized'){
                logout();
            }
            else setError(err.message || 'Failed to delete all stats.');
        }
    }, [logout]);

    const handleDeleteSingleStat = useCallback(async (statId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            logout();
            return;
        }
        const confirmed = window.confirm("Are you sure you want to delete this stat info? This action cannot be undone.");
        if (!confirmed) return;

        setError('');
        try {
            await deleteSingleUserStat(statId, token);
            setUserProfile(prev => ({
                ...prev,
                stats: prev.stats.filter(stat => stat.id !== statId)
            }));
        } catch (err) {
            if (err.message === 'Unauthorized'){
                logout();
            }
            else setError(err.message || 'Failed to delete stat.');
        }
    }, [logout]);

    const handleDeleteAccount = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token || !currentUser) {
            logout(); return;
        }
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmed) return;

        setError('');
        try {
            await deleteUserAccount(currentUser.id, token);
            alert('Your account was deleted successfully');
            logout();
        } catch (err) {
            console.error("Error deleting account:", err);
            if (err.message === 'Unauthorized') logout();
            else setError(err.message || "Failed to delete account.");
        }
    }, [currentUser, logout]);

    return { userProfile, isLoading, error, handleDeleteAllStats, handleDeleteSingleStat, handleDeleteAccount };
}