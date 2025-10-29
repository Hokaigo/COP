import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSettings } from "../../../contexts/SettingsContext.jsx";
import { PRESETS, EMPTY_CELLS_BOUNDS } from "../../../config/gameConfig.js";

const modalRoot = typeof document !== "undefined" ? document.getElementById("modal-root") : null;

const schema = yup.object({
    difficulty: yup.string().oneOf(Object.keys(PRESETS)).required("Please, select difficulty level."),
    emptyCellsCount: yup.number().typeError("Input data must be a number.")
        .min(EMPTY_CELLS_BOUNDS.min, `Input value must be more or equal ${EMPTY_CELLS_BOUNDS.min}.`)
        .max(EMPTY_CELLS_BOUNDS.max, `Input value must be less or equal ${EMPTY_CELLS_BOUNDS.max}.`)
        .required("Please, select empty cells quantity on initialization."),
    timeLimit: yup.number().typeError("Input data must be a number.").min(30, "Input value must be more or equal 30.")
        .required("Please, select time limit in seconds."),
});

export default function SettingsModal({ isOpen, onClose }) {
    const { settings, update } = useSettings();

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            difficulty: settings.difficulty,
            emptyCellsCount: settings.emptyCellsCount,
            timeLimit: settings.timeLimit,
        },
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                difficulty: settings.difficulty,
                emptyCellsCount: settings.emptyCellsCount,
                timeLimit: settings.timeLimit,
            });
        }
    }, [isOpen, settings, reset]);

    function onSubmit(data) {
        update({
            difficulty: data.difficulty,
            emptyCellsCount: Number(data.emptyCellsCount),
            timeLimit: Number(data.timeLimit),
        });
        onClose?.();
    }

    const watchedDifficulty = watch("difficulty");

    useEffect(() => {
        if (!watchedDifficulty) return;
        const preset = PRESETS[watchedDifficulty] ?? PRESETS.medium;
        setValue("emptyCellsCount", preset.emptyCellsCount, { shouldValidate: true, shouldDirty: false });
        setValue("timeLimit", preset.timeLimit, { shouldValidate: true, shouldDirty: false });
    }, [watchedDifficulty, setValue]);

    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"/>
                <div role="dialog" aria-modal="true" className="relative w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="bg-neutral-800 text-neutral-100 rounded-2xl shadow-xl p-6 border border-neutral-700">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-semibold">Game settings</h3>
                            <button type="button" onClick={onClose} aria-label="Close"
                                    className="text-neutral-300 hover:text-neutral-100 rounded-full p-1">x</button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="difficulty-select" className="block text-sm mb-1">Difficulty level</label>
                                <select id="difficulty-select" {...register("difficulty")}
                                    className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    {Object.keys(PRESETS).map((k) => (
                                        <option key={k} value={k}>
                                            {k[0].toUpperCase() + k.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.difficulty && (<p className="text-xs text-rose-400 mt-1">{errors.difficulty.message}</p>)}
                            </div>

                            <div>
                                <label htmlFor="emptyCellsCount-input" className="block text-sm mb-1">
                                    Empty cells quantity ({EMPTY_CELLS_BOUNDS.min} - {EMPTY_CELLS_BOUNDS.max})
                                </label>
                                <input id="emptyCellsCount-input" type="number"{...register("emptyCellsCount")}
                                       className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                {errors.emptyCellsCount && (<p className="text-xs text-rose-400 mt-1">{errors.emptyCellsCount.message}</p>)}
                            </div>

                            <div>
                                <label htmlFor="timeLimit-input" className="block text-sm mb-1">
                                    Time limit (in seconds)
                                </label>
                                <input id="timeLimit-input" type="number"{...register("timeLimit")}
                                    className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                {errors.timeLimit && (<p className="text-xs text-rose-400 mt-1">{errors.timeLimit.message}</p>)}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600">
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500">Save</button>
                        </div>
                    </form>
                </div>
            </div>,
        modalRoot
    );
}
