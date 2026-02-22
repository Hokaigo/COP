import { BACKEND_URL } from "../config/gameConfig.js";

/**
 * Утиліта для обробки HTTP-відповідей.
 * Перевіряє статус відповіді та парсить JSON.
 *
 * @private
 * @param {Response} response - Об'єкт відповіді від fetch.
 * @throws {Error} Викидає помилку "Unauthorized" для статусів 401/403 або опис помилки з сервера.
 * @returns {Promise<Object>} Розпарсений JSON об'єкт.
 */
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

/**
 * Запит профілю користувача.
 *
 * @function fetchUserProfile
 * @name fetchUserProfile
 * @param {string|number} id - ID користувача.
 * @param {string} token - JWT токен.
 * @returns {Promise<Object>} Проміс, що повертає об'єкт із даними профілю користувача.
 */
export const fetchUserProfile = async (id, token) => {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
};

/**
 * Очищення всієї статистики користувача.
 *
 * @function deleteAllUserStats
 * @name deleteAllUserStats
 * @param {string} token - JWT токен.
 * @returns {Promise<Object>} Проміс, що повертає результат операції видалення статистики.
 */
export const deleteAllUserStats = async (token) => {
    const response = await fetch(`${BACKEND_URL}/stats`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
};

/**
 * Видалення одного запису статистики.
 *
 * @function deleteSingleUserStat
 * @name deleteSingleUserStat
 * @param {number} statId - ID запису.
 * @param {string} token - JWT токен.
 * @returns {Promise<Object>} Проміс, що повертає результат операції видалення конкретного запису.
 */
export const deleteSingleUserStat = async (statId, token) => {
    const response = await fetch(`${BACKEND_URL}/stats/${statId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
};

/**
 * Повне видалення облікового запису.
 *
 * @function deleteUserAccount
 * @name deleteUserAccount
 * @param {number} userId - ID користувача.
 * @param {string} token - JWT токен.
 * @returns {Promise<{success: boolean}>} Проміс, що повертає об'єкт з прапорцем успішного завершення.
 */
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