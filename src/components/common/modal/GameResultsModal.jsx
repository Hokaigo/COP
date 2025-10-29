import React from "react";
import ReactDOM from "react-dom";
import { formatTime } from "../../../utils/time.js";

const modalRoot = typeof document !== "undefined" ? document.getElementById("modal-root") : null;

export default function GameResultsModal({ isOpen, result, onPlayAgain, onBackToMain }) {
    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onBackToMain} aria-hidden="true"/>

            <div role="dialog" aria-modal="true" className="relative w-full max-w-md mx-4 transform transition-all"
                onClick={(e) => e.stopPropagation()}>
                <div className="bg-neutral-800 text-neutral-100 rounded-2xl shadow-2xl p-6 border border-neutral-700">
                    <header className="mb-4">
                        <h3 className="text-xl font-semibold text-center">The Game is Over</h3>
                    </header>

                    <div className="space-y-3 mb-4">
                        <p className="text-center text-sm">
                            Result: <strong className="text-indigo-300">{result?.correct ?? 0}</strong> / {result?.total ?? 81}
                            <br />
                            Score: <strong className="text-indigo-300">{result?.score ?? 0}%</strong>
                        </p>

                        <p className="text-center text-sm">
                            Time spent: <strong>{formatTime(result?.timeSpent ?? 0)}</strong>
                        </p>
                    </div>

                    <footer className="flex gap-3 justify-center">
                        <button onClick={onPlayAgain}
                                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 font-medium transition">
                            Play again
                        </button>

                        <button onClick={onBackToMain}
                                className="px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 font-medium transition">
                            To main page
                        </button>
                    </footer>
                </div>
            </div>
        </div>,
        modalRoot
    );
}
