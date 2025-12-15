import React, { useState } from "react";
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
    name: yup.string().trim().required("Name is required.").min(2, "Please, enter 2 or more symbols.")
        .max(10, "Please, enter 10 or less symbols.").matches(/^\S+$/, "Name must not contain spaces."),
    email: yup.string().trim().email("Incorrect email format.").required("Email is required.")
        .matches(/^\S+$/, "Name must not contain spaces."),
    password: yup.string().trim().min(6, "Please, enter 6 or more symbols.").max(30, "Please, enter 30 or less symbols.")
        .matches(/^\S+$/, "Name must not contain spaces."),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match.").required("Please confirm your password."),
    }).required();

export default function RegisterPage() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            const response = await fetch("http://sudoku.local/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                setServerError(result.error || "A server error occurred.");
            } else {
                navigate("/login");
            }
        } catch {
            setServerError("Error to connect the server.");
        }
    };

    return (
        <div className="mx-auto my-8 p-6 bg-neutral-800 rounded-2xl shadow-md w-full max-w-md">
            <h1 className="text-2xl font-semibold mb-4 text-white">Registration</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {serverError && (<div className="text-sm text-rose-200 bg-rose-900/20 p-2 rounded">{serverError}</div>)}

                <div>
                    <label htmlFor="name" className="block text-sm mb-1 text-neutral-200">Name</label>
                    <input id="name" type="text"{...register("name")}
                           className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           aria-invalid={errors.name ? "true" : "false"}/>
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm mb-1 text-neutral-200">Email</label>
                    <input id="email" type="email" {...register("email")} className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm mb-1 text-neutral-200">Confirm Password</label>
                    <input id="confirmPassword" type="password"{...register("confirmPassword")}
                           className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           aria-invalid={errors.confirmPassword ? "true" : "false"}/>
                    {errors.confirmPassword && (<p className="text-xs text-rose-400 mt-1">{errors.confirmPassword.message}</p>)}
                </div>

                <div className="space-y-2">
                    <button type="submit" disabled={isSubmitting}
                            className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-medium transition">
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>

                    <Link to="/" className="block text-center w-full px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-white font-medium transition">
                        Back to Main
                    </Link>
                </div>
            </form>
        </div>
    );
}
