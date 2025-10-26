import ReactDOM from "react-dom";
import React from "react";
import { formatTime } from "../../../utils/time.js"

const modalRoot = typeof document !== "undefined" ? document.getElementById("modal-root") : null;

export default function GameResultsModal( { isOpen, result, onPlayAgain, onBackToMain } ){
    if(!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal d-block fade show" tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content bg-dark text-light border-0">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">The Game is Over</h5>
                        </div>

                        <div className="modal-body">
                            <p className="lead text-center">
                                Result: <strong>{result?.correct ?? 0}</strong> / {result?.total ?? 81}
                                <br/>
                                Score: <strong>{result?.score ?? 0}%</strong>
                            </p>

                            <p className="text-center">
                                Time spent: <strong>{formatTime(result?.timeSpent ?? 0)}</strong>
                            </p>
                        </div>

                        <div className="modal-footer border-0 pt-0 justify-content-center">
                            <button className="btn btn-primary" onClick={onPlayAgain}>Play again</button>
                            <button className="btn btn-secondary" onClick={onBackToMain}>To main page</button>
                        </div>
                    </div>
                </div>
            </div>
        </>, modalRoot
    );
}