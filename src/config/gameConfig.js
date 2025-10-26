export const PRESETS ={
    easy: { emptyCellsCount: 36, timeLimit: 20 * 60 },
    medium: { emptyCellsCount: 46, timeLimit: 15 * 60 },
    hard: { emptyCellsCount: 54, timeLimit: 10 * 60 }
};

export const DEFAULT_EMPTY_CELLS = PRESETS.medium.emptyCellsCount;

const presetValues = Object.values(PRESETS).map(p => p.emptyCellsCount);
export const EMPTY_CELLS_BOUNDS = {
    min: Math.min(...presetValues),
    max: Math.max(...presetValues)
};