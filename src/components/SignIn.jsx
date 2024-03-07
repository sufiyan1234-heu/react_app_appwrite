import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
import authService from "../appwrite/auth"


const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const createAccount = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({ userData }))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }



    return (
        <div
            className="flex items-center justify-center"
        >
            <div className={`mx-auto w-full max-w-lg 
            bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center ">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Create an account
                </h2>
                <p className="mt-2 text-center text-base text-black/69">
                    Already have any account?&nbsp;
                    <Link to="/login"
                        className="font-medium text-primary transition-all duration-200 
                    hover:underline">
                        Login
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">
                    {error}</p>}

                <form onSubmit={handleSubmit(createAccount)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter Full Name"
                            {
                            ...register("name", {
                                required: {
                                    value: true,
                                    message: "Please enter your full name"
                                }
                            })
                            }
                        />
                        <Input label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    validate: {
                                        matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid email address."
                                    },
                                    message: "Email is required"
                                }
                            })} />
                        <Input label="Password: "
                            placeholder="Enter your password"
                            type="password"

                            {...register("password", {
                                required: {
                                    value: true,
                                    validate: {
                                        matchPattern: (value) => /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value) || "Password should be at least one capital letter, one small letter, one number and 8 character length"
                                    },
                                    message: "Password is required"
                                }
                            })}
                        />
                        <Button type="submit"
                            className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn