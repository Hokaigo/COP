import {DEFAULT_EMPTY_CELLS, PRESETS} from "../../config/gameConfig.js";
import { persist } from "zustand/middleware";
import { create } from 'zustand';


const KEY = "sudoku_settings";

const defaultSettings ={
    difficulty: "medium",
    emptyCellsCount: DEFAULT_EMPTY_CELLS,
    timeLimit: PRESETS.medium.timeLimit
};

/**
 * Налаштування гри Судоку.
 *
 * @typedef {Object} GameSettings
 * @property {string} difficulty - Рівень складності гри.
 * @property {number} emptyCellsCount - Кількість порожніх клітинок для заповнення.
 * @property {number} timeLimit - Часове обмеження на партію у секундах.
 */

/**
 * useSettingsStore — Глобальне сховище налаштувань гри з підтримкою збереження у LocalStorage.
 *
 * @function useSettingsStore
 * @name useSettingsStore
 * @property {GameSettings} settings - Поточний об'єкт налаштувань.
 * @property {Function} update - Метод для оновлення налаштувань. При зміні складності автоматично коригує час та кількість клітинок за пресетами.
 * @property {Function} reset - Скидає налаштування до значень за замовчуванням.
 */
export const useSettingsStore = create(
    persist((set) => ({
            settings: defaultSettings,
            update: (options) => set((state) =>{
                let next = { ...state.settings, ...options }

                if(options?.difficulty) {
                    const preset = PRESETS[options.difficulty] ?? PRESETS.medium;

                    if (options.emptyCellsCount === undefined) {
                        next.emptyCellsCount = preset.emptyCellsCount;
                    }
                    if (options.timeLimit === undefined){
                        next.timeLimit = preset.timeLimit;
                    }
                }
                return { settings: next }
            }),
        reset: () => set({ settings: defaultSettings })
        }),
        {
            name: KEY
        }
    )
)