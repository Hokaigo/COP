import { create } from "zustand";

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