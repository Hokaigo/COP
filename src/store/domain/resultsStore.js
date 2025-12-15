import { create } from 'zustand'

export const useResultsStore = create((set) => ({
    result: null,
    setResult: (resultData) => set({ result: resultData}),
    clearResult: () => set({ result: null })
}));