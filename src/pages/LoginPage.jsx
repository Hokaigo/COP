import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";

const schema = yup.object({
    email: yup.string().email("Incorrect email format.").required("Email is required."),
    password: yup.string().min(6, "Please, enter 6 or more symbols.").max(30, "Please, enter 30 or less symbols.")
        .matches(/^\S+$/, "Password must not contain spaces.")
}).required();

export default function LoginPage() {
    const { login } = useAuth();
    const [serverError, setServerError] = useState("");
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            const response = await fetch("http://sudoku.local/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setServerError(result.error || "A server error occurred.");
            } else {
                if (result.token && result.user && result.user.id) {
                    login(result.token, result.user);
                } else {
                    setServerError("Received invalid data from server.");
                }
            }
        } catch {
            setServerError("Error to connect the server.");
        }
    };

    return (
        <div className="mx-auto my-8 p-6 bg-neutral-800 rounded-2xl shadow-md w-full max-w-md">
            <h1 className="text-2xl font-semibold mb-4 text-white">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {serverError && (
                    <div className="text-sm text-rose-200 bg-rose-900/20 p-2 rounded">
                        {serverError}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm mb-1 text-neutral-200">
                        Email
                    </label>
                    <input id="email" type="email" {...register("email")}
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-invalid={errors.email ? "true" : "false"}/>
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm mb-1 text-neutral-200">Password</label>
                    <input id="password" type="password" {...register("password")}
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-invalid={errors.password ? "true" : "false"}/>
                    {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                    <button type="submit" disabled={isSubmitting}
                        className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-medium transition">
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                    <Link to="/" className="block text-center w-full px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-white font-medium transition">
                        Back to Main
                    </Link>
                </div>
            </form>
        </div>
    );
}
