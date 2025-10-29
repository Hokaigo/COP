import { BACKEND_URL } from "../config/gameConfig.js";

const handleResponse = async (response) => {
    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
    }
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
    }
    return data;
};

export const fetchUserProfile = async (id, token) => {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
};

export const deleteAllUserStats = async (token) => {
    const response = await fetch(`${BACKEND_URL}/stats`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
};

export const deleteSingleUserStat = async (statId, token) => {
    const response = await fetch(`${BACKEND_URL}/stats/${statId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
};

export const deleteUserAccount = async (userId, token) => {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
    }
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Server error: ${response.status}`);
    }
    return { success: true };
};