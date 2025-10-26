import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSettings } from "../../../contexts/SettingsContext.jsx";
import { PRESETS, EMPTY_CELLS_BOUNDS } from "../../../config/gameConfig.js";

const modalRoot =  typeof document !== "undefined" ? document.getElementById("modal-root") : null;

const schema = yup.object({
    difficulty: yup.string().oneOf(Object.keys(PRESETS)).required("Please, select difficulty level."),
    emptyCellsCount: yup.number().typeError("Input data must be a number.")
        .min(EMPTY_CELLS_BOUNDS.min, `Input value must be more or equal ${EMPTY_CELLS_BOUNDS.min}.`)
        .max(EMPTY_CELLS_BOUNDS.max, `Input value must be less or equal ${EMPTY_CELLS_BOUNDS.max}.`)
        .required("Please, select empty cells quantity on initialization."),
    timeLimit: yup.number().typeError("Input data must be a number.")
        .min(30, "Input value must be more or equal 30.")
        .required("Please, select time limit in seconds.")
});

export default function SettingsModal( { isOpen, onClose}){
    const { settings, update } = useSettings();

    const { register, handleSubmit, setValue, watch, reset, formState : { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            difficulty: settings.difficulty,
            emptyCellsCount: settings.emptyCellsCount,
            timeLimit: settings.timeLimit
        }
    });

    useEffect(()=>{
        if(isOpen){
            reset({
                difficulty: settings.difficulty,
                emptyCellsCount: settings.emptyCellsCount,
                timeLimit: settings.timeLimit
            });
        }
    }, [isOpen, settings, reset]);

    function onSubmit(data){
        update({
            difficulty: data.difficulty,
            emptyCellsCount: Number(data.emptyCellsCount),
            timeLimit: Number(data.timeLimit)
        });
        onClose?.()
    }

    const watchedDifficulty = watch("difficulty");

    useEffect(()=>{
        if(!watchedDifficulty) return;
        const preset = PRESETS[watchedDifficulty] ?? PRESETS.medium;
        setValue("emptyCellsCount", preset.emptyCellsCount, { shouldValidate: true, shouldDirty: false});
        setValue("timeLimit", preset.timeLimit, {shouldValidate: true, shouldDirty: false})
    }, [watchedDifficulty, setValue])

    if(!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal d-block fade show" tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content bg-dark text-light border-0">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">Game settings</h5>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="difficulty-select" className="form-label">Difficulty level</label>
                                <select name="difficulty-select" id="difficulty-select" className="form-select border-0" {...register("difficulty")}>
                                    {Object.keys(PRESETS).map(k => (
                                        <option key={k} value={k}>{k[0].toUpperCase() + k.slice(1)}</option>
                                    ))}
                                </select>
                                {errors.difficulty && <p className="form-text text-danger">{errors.difficulty.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emptyCellsCount-input" className="form-label">Empty cells quantity
                                    ({EMPTY_CELLS_BOUNDS.min} - {EMPTY_CELLS_BOUNDS.max})</label>
                                <input type="number" id="emptyCellsCount-input" className="form-control border-0"
                                       {...register("emptyCellsCount")}/>
                                {errors.emptyCellsCount && <p className="form-text text-danger">{errors.emptyCellsCount.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="timeLimit-input" className="form-label">Time limit (in seconds)</label>
                                <input type="number" id="timeLimit-input" className="form-control border-0" {...register("timeLimit")}/>
                                {errors.timeLimit && <p className="form-text text-danger">{errors.timeLimit.message}</p>}
                            </div>

                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>, modalRoot
    );
}