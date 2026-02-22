    import {useCallback, useState} from "react";
    import {generatePuzzle} from "../../utils/datasetGenerator.js";

    /**
     * Кастомний хук для керування генерацією головоломки судоку.
     * Ініціалізує початковий стан ігрового поля та надає функцію для створення нових ігор.
     *
     * @function usePuzzle
     * @name usePuzzle
     * @param {Object} [options={}] - Опції конфігурації хука.
     * @param {number} [options.initialEmpty] - Базова кількість порожніх клітинок для генерації поля.
     * @returns {Object} Об'єкт зі станом поточної гри та методом для її оновлення.
     * @property {Object} seed - Згенерований об'єкт головоломки, який містить матрицю поля, масив фіксованих клітинок тощо.
     * @property {Function} newPuzzle - Функція для примусової генерації нової головоломки.
     */
    export default function usePuzzle({ initialEmpty = undefined } ={}){
        const [seed, setSeed] = useState(() => generatePuzzle({ emptyCellsCount: initialEmpty }));

        const newPuzzle = useCallback((opts = {}) => {
            const s = generatePuzzle({ emptyCellsCount: opts.emptyCellsCount ?? initialEmpty });
            setSeed(s);
            return s;
        }, [initialEmpty]);
        return { seed, newPuzzle }
    }