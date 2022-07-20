import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import Loading from "../Shared/Loading/Loading";
// import useToken from "../../hooks/useToken";
import auth from "../../firebase.inti";
import "./Test.module.css"
const Test = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [showPassword, setShowPassword] = useState(false);
  // const [token] = useToken(user||guser)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let authError;

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Please Login</h2>

        <div className="password">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Provide a valid email address",
              },
            })}
            type="email"
            placeholder="email"
            className="input input-bordered"
          />{" "}
          <br />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control" style={{ position:"relative" }}>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                message:
                  "Maximum 20 character, at least one numeric digit, one uppercase and one lowercase letter",
              },

              minLength: {
                value: 6,
                message: "Must be at least 6 characters or more",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="password"
          />
          <p
            onClick={() => setShowPassword(!showPassword)}
            className="key"
            style={{ cursor: "pointer",display: "inline-block", position:"absolute", top: "-70%", left: "60%"}}
          >
            🗝
          </p>{" "}
          <br />
          <label className="label">
            {errors.password?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="label-text-alt text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>
        </div>

        <button type="submit" class="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Test;
