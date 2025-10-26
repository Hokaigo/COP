import React, { createContext, useContext, useState, useEffect } from "react";
import { PRESETS, DEFAULT_EMPTY_CELLS } from "../config/gameConfig.js";

const KEY = "sudoku_settings";

const defaultSettings ={
    difficulty: "medium",
    emptyCellsCount: DEFAULT_EMPTY_CELLS,
    timeLimit: PRESETS.medium.timeLimit
};

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(()=>{
       try{
            const raw = localStorage.getItem(KEY);
            if(raw) {
                const parsed = JSON.parse(raw)
                return {...defaultSettings, ...parsed}
            }
            return defaultSettings;
       }
       catch{
            return defaultSettings;
       }
    });

    useEffect(()=>{
        try {
            localStorage.setItem(KEY, JSON.stringify(settings));
        } catch (error) {
            console.warn(error);
        }
    }, [settings]);

    function update(options){
        setSettings(prev =>{
            let next = { ...prev, ...options};

            if(options?.difficulty){
                const preset = PRESETS[options.difficulty] ?? PRESETS.medium;

                if (options.emptyCellsCount === undefined) next.emptyCellsCount = preset.emptyCellsCount;
                if (options.timeLimit === undefined) next.timeLimit = preset.timeLimit;
            }
            return next;
        });
    }

    function reset(){
        setSettings(defaultSettings);
    }

    return(
        <SettingsContext.Provider value={{settings, update, reset, PRESETS}}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings(){
    const context = useContext(SettingsContext);
    if (!context) throw new Error("useSettings must be inside the provider");
    return context;
}