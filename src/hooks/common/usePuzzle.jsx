    import {useCallback, useState} from "react";
    import {generatePuzzle} from "../../utils/datasetGenerator.js";

    export default function usePuzzle({ initialEmpty = undefined } ={}){
        const [seed, setSeed] = useState(() => generatePuzzle({ emptyCellsCount: initialEmpty }));

        const newPuzzle = useCallback((opts = {}) => {
            const s = generatePuzzle({ emptyCellsCount: opts.emptyCellsCount ?? initialEmpty });
            setSeed(s);
            return s;
        }, [initialEmpty]);
        return { seed, newPuzzle }
    }