/**
 * Конфігураційні пресети для різних рівнів складності гри.
 * Містять кількість порожніх клітинок та ліміт часу для кожного рівня.
 *
 * @constant {Object}
 * @property {Object} easy - Легкий рівень.
 * @property {number} easy.emptyCellsCount - Кількість порожніх клітинок (36).
 * @property {number} easy.timeLimit - Ліміт часу в секундах (1200).
 * @property {Object} medium - Середній рівень.
 * @property {number} medium.emptyCellsCount - Кількість порожніх клітинок (46).
 * @property {number} medium.timeLimit - Ліміт часу в секундах (900).
 * @property {Object} hard - Складний рівень.
 * @property {number} hard.emptyCellsCount - Кількість порожніх клітинок (54).
 * @property {number} hard.timeLimit - Ліміт часу в секундах (600).
 */
export const PRESETS ={
    easy: { emptyCellsCount: 36, timeLimit: 20 * 60 },
    medium: { emptyCellsCount: 46, timeLimit: 15 * 60 },
    hard: { emptyCellsCount: 54, timeLimit: 10 * 60 }
};

/**
 * Значення кількості порожніх клітинок за замовчуванням.
 *
 * @constant {number}
 */
export const DEFAULT_EMPTY_CELLS = PRESETS.medium.emptyCellsCount;

const presetValues = Object.values(PRESETS).map(p => p.emptyCellsCount);

/**
 * Межі допустимої кількості порожніх клітинок для валідації налаштувань.
 * Обчислюються автоматично на основі значень у PRESETS.
 *
 * @constant {Object}
 * @property {number} min - Мінімальна допустима кількість порожніх клітинок.
 * @property {number} max - Максимальна допустима кількість порожніх клітинок.
 */
export const EMPTY_CELLS_BOUNDS = {
    min: Math.min(...presetValues),
    max: Math.max(...presetValues)
};

/**
 * Базова URL-адреса для запитів до бекенду.
 *
 * @constant {string}
 */
export const BACKEND_URL = 'http://sudoku.local';