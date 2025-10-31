import {DEFAULT_EMPTY_CELLS, PRESETS} from "../config/gameConfig.js";
import { persist } from "zustand/middleware";
import { create } from 'zustand';


const KEY = "sudoku_settings";

const defaultSettings ={
    difficulty: "medium",
    emptyCellsCount: DEFAULT_EMPTY_CELLS,
    timeLimit: PRESETS.medium.timeLimit
};

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