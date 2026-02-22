import { create } from 'zustand'

/**
 * Дані результатів гри.
 *
 * @typedef {Object} ResultData
 * @property {number} score - Відсоток успішно заповнених клітинок.
 * @property {number} correct - Кількість правильних клітинок.
 * @property {number} total - Загальна кількість клітинок.
 * @property {number} timeSpent - Час, витрачений на гру в секундах.
 */

/**
 * Store для керування результатами гри.
 * Використовується для збереження та передачі даних про завершену гру між ігровим контролером та модальним вікном.
 *
 * @function useResultsStore
 * @name useResultsStore
 * @returns {Object} Об'єкт стану стору.
 * @property {ResultData|null} result - Поточний об'єкт результатів останньої гри.
 * @property {Function} setResult - Функція для збереження нових результатів.
 * @property {Function} clearResult - Функція для очищення результатів (скидання до null).
 */
export const useResultsStore = create((set) => ({
    result: null,
    setResult: (resultData) => set({ result: resultData}),
    clearResult: () => set({ result: null })
}));