import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Input, Button, Logo } from "./index";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signup = async (data) => {
    setError("");
    try {
      const userAcc = await authService.createAccount(data);
      if (userAcc) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto max-w-lg bg-gray-100
       rounded-xl p-10 border border-black/10`}
      >
        <Logo width="10px" />

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className=" font-medium text-primary transition-all 
        duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className=" text-red-500 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-8">
            <Input
              label="Name: "
              type="text"
              placeholder="Enter ur Full name "
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email: "
              type="email"
              placeholder="Enter ur email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid",
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full text-white hover:bg-gray-400 hover:text-black font-bold">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
