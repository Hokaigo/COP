import React from "react";

import { formatTime } from "../utils/time.js";
import { useUserProfile } from "../hooks/users/useUserProfile.jsx";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const { userProfile, isLoading, error, handleDeleteAllStats, handleDeleteSingleStat, handleDeleteAccount } = useUserProfile();

    if (isLoading) {
        return <p className="text-center text-neutral-300">Loading profile...</p>;
    }

    if (error) {
        return (
            <div className="mx-auto w-full max-w-2xl px-4">
                <div className="bg-rose-900/20 text-rose-200 p-4 rounded-md text-center">
                    <h4 className="font-semibold mb-2">Error loading profile</h4>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!userProfile) {
        return <p className="text-center text-neutral-300">Profile is not available now.</p>;
    }

    return (
        <div className="mx-auto w-full max-w-3xl px-4">
            <div className="bg-neutral-800 rounded-2xl p-6 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <h1 className="text-2xl font-semibold text-white">{userProfile.name}'s Profile</h1>
                    <div className="flex items-center gap-3">
                        <Link to="/" className="px-3 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-sm font-medium transition">
                            Back to Main
                        </Link>

                        <button onClick={handleDeleteAccount}
                            className="px-3 py-2 rounded-md bg-rose-600 hover:bg-rose-500 text-sm font-medium text-white transition">
                            Delete My Account
                        </button>
                    </div>
                </div>

                <p className="text-sm mb-4">
                    <strong>Email:</strong> <span className="text-neutral-200">{userProfile.email}</span>
                </p>

                <hr className="border-neutral-700 my-4" />

                <h2 className="text-lg font-semibold mb-3">Game Statistics</h2>

                {userProfile.stats && Array.isArray(userProfile.stats) && userProfile.stats.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="text-neutral-400 text-xs uppercase">
                                    <th className="px-3 py-2">Date</th>
                                    <th className="px-3 py-2">Time Spent</th>
                                    <th className="px-3 py-2">Correct</th>
                                    <th className="px-3 py-2">Score</th>
                                    <th className="px-3 py-2" />
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-neutral-700">
                                {userProfile.stats.map((stat) => (
                                    <tr key={stat.id} className="odd:bg-neutral-800 even:bg-neutral-810">
                                        <td className="px-3 py-3 align-top text-neutral-200">
                                            {new Date(stat.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-3 py-3 align-top text-neutral-200">
                                            {formatTime(stat.time_spent)}
                                        </td>
                                        <td className="px-3 py-3 align-top text-neutral-200">
                                            {stat.correct_cells} / 81
                                        </td>
                                        <td className="px-3 py-3 align-top text-neutral-200">{stat.score_percent}%</td>
                                        <td className="px-3 py-3 align-top">
                                            <button
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-lg transition"
                                                onClick={() => handleDeleteSingleStat(stat.id)}
                                                title="Delete this record">
                                                x
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4">
                            <button onClick={handleDeleteAllStats}
                                className="px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-500 text-white font-medium transition">
                                Delete All History
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-neutral-300">No game statistics found yet. Play some games!</p>
                )}
            </div>
        </div>
    );
}
