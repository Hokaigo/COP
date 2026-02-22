import { create } from "zustand";

/**
 * Стан модальних вікон інтерфейсу.
 *
 * @typedef {Object} UIModals
 * @property {boolean} settings - Стан модального вікна налаштувань.
 * @property {boolean} results - Стан модального вікна результатів гри.
 */

/**
 * useUIStore — Глобальне сховище для керування станом інтерфейсу.
 * Відповідає за відкриття та закриття модальних вікон у додатку.
 *
 * @function useUIStore
 * @name useUIStore
 * @property {UIModals} modals - Об'єкт, що містить булеві значення стану для кожного вікна.
 * @property {Function} openSettings - Відкриває модальне вікно налаштувань.
 * @property {Function} closeSettings - Закриває модальне вікно налаштувань.
 * @property {Function} openResults - Відкриває модальне вікно з результатами гри.
 * @property {Function} closeResults - Закриває модальне вікно з результатами гри.
 */
export const useUIStore = create((set) => ({
    modals:{
        settings: false,
        results: false
    },

    openSettings: () => set((state) => ({
        modals: { ...state.modals, settings: true }
    })),
    closeSettings: () => set((state) =>({
        modals: { ...state.modals, settings: false }
    })),
    openResults: () => set((state) => ({
        modals: { ...state.modals, results: true }
    })),
    closeResults: () => set((state) =>({
        modals: { ...state.modals, results: false }
    })),
}));