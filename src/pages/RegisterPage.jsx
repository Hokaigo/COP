import React, {useState} from "react";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
    name: yup.string().trim().required("Name is required.").min(2, "Please, enter 2 or more symbols.")
        .max(10, "Please, enter 10 or less symbols.").matches(/^\S+$/, "Name must not contain spaces."),
    email: yup.string().trim().email("Incorrect email format.").required("Email is required.").matches(/^\S+$/, "Name must not contain spaces."),
    password: yup.string().trim().min(6, "Please, enter 6 or more symbols.").max(30, "Please, enter 30 or less symbols.")
        .matches(/^\S+$/, "Name must not contain spaces."),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match.')
        .required('Please confirm your password.')
}).required()

export default function RegisterPage(){
    const navigate = useNavigate()
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit,
        formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) =>{
        setServerError('');
        try{
            const response = await fetch('http://sudoku.local/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok){
                setServerError(result.error || 'A server error occurred.')
            } else {
                navigate('/login');
            }
        } catch {
            setServerError('Error to connect the server.')
        }
    };

    return(
        <div className="container bg-body-secondary rounded-3 p-4" style={{ maxWidth: '500px'}}>
            <h1>Registration</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                { serverError && (<div className="alert alert-danger">{serverError}</div>) }

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className='form-control border-0' id="name" {...register('name')}/>
                    {errors.name && <p className="form-text text-danger">{errors.name.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control border-0" {...register("email")}/>
                    {errors.email && <p className="form-text text-danger">{errors.email.message}</p>}
                </div>
                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control border-0" {...register("password")}/>
                    {errors.password && <p className="form-text text-danger">{errors.password.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" id="confirmPassword" className={`form-control border-0`} {...register("confirmPassword")} />
                    {errors.confirmPassword && <p className="form-text text-danger">{errors.confirmPassword.message}</p>}
                </div>

                <div className="pt-0">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                </div>
            </form>
        </div>
    )
}