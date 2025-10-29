import React from "react";

import {formatTime} from "../utils/time.js";
import {useUserProfile} from "../hooks/users/useUserProfile.jsx";
import {Link} from "react-router-dom";

export default function ProfilePage(){
    const { userProfile, isLoading, error, handleDeleteAllStats, handleDeleteSingleStat,
        handleDeleteAccount } = useUserProfile();

    if (isLoading){
        return <p className="text-center">Loading profile...</p>;
    }

    if (error) {
        return (
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="alert alert-danger text-center" role="alert">
                    <h4>Error loading profile</h4>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!userProfile){
        return <p className="text-center">Profile is not available now.</p>;
    }

    return (
        <div className="container bg-body-tertiary rounded-3 p-4 mx-auto" style={{ maxWidth: '800px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>{userProfile.name}'s Profile</h1>
                <Link to="/" className="btn btn-secondary">Back to Main</Link>
            </div>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <button className="btn btn-danger btn-sm mb-3" onClick={handleDeleteAccount}>Delete My Account</button>
            <hr />

            <h2>Game Statistics</h2>
            {userProfile.stats && Array.isArray(userProfile.stats) && userProfile.stats.length > 0 ? (
                <>
                    <div className="table-responsive">
                        <table className="table table-striped table-dark table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Time Spent</th>
                                <th scope="col">Correct</th>
                                <th scope="col">Score</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {userProfile.stats.map((stat) => (
                                <tr key={stat.id}>
                                    <td>{new Date(stat.created_at).toLocaleString()}</td>
                                    <td>{formatTime(stat.time_spent)}</td>
                                    <td>{stat.correct_cells} / 81</td>
                                    <td>{stat.score_percent}%</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteSingleStat(stat.id)} title="Delete this record">
                                            &times;
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-danger mt-3" onClick={handleDeleteAllStats}>Delete All History</button>
                </>
            ) : (
                <p>No game statistics found yet. Play some games!</p>
            )}
        </div>
    );
}