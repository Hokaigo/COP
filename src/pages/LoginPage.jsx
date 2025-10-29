import React, {useState} from "react";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useAuth} from "../contexts/AuthContext.jsx";

const schema = yup.object({
    email: yup.string().email("Incorrect email format.").required("Email is required."),
    password: yup.string().min(6, "Please, enter 6 or more symbols.").max(30, "Please, enter 30 or less symbols.")
        .matches(/^\S+$/, "Password must not contain spaces.")
}).required();

export default function LoginPage(){
    const { login } = useAuth();
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
       resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setServerError('');
        try {
            const response = await fetch('http://sudoku.local/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                setServerError(result.error || 'A server error occurred.');
            } else {
                if (result.token && result.user && result.user.id) {
                    login(result.token, result.user);
                } else {
                    setServerError('Received invalid data from server.');
                }
            }
        } catch {
            setServerError('Error to connect the server.');
        }
    };

    return(
        <div className="container bg-body-secondary rounded-3 p-4" style={{ maxWidth: '500px' }}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {serverError && (<div className="alert alert-danger">{serverError}</div>)}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control border-0" {...register("email")} />
                    {errors.email && <p className="form-text text-danger">{errors.email.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control border-0" {...register("password")} />
                    {errors.password && <p className="form-text text-danger">{errors.password.message}</p>}
                </div>

                <div className="pt-0">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}