import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import "./Login.css"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useForm } from "react-hook-form";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import Loading from "../Shared/Loading/Loading";
import auth from "../../firebase.inti";
import useToken from "../../hooks/useToken";

const Login = () => {
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
  const [token] = useToken(user||guser)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let authError;
  useEffect(() => {
    if (token) {
      if(from){
        navigate(from, { replace: true });
      }else{
        navigate('/')
      }
      
    }
  }, [user, guser, from, navigate,token]);
  if (loading || gloading) {
    return <Loading></Loading>;
  }
  if (error || gerror) {
    authError = (
      <small className="text-red-500">
        {error?.message || gerror?.message}
      </small>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    reset();
  };
  return (
    <div>
      <h1 className="text-3xl text-primary mb-5">Login!</h1>
      <div className="card mx-auto flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-20">
        <div className="card-body">
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
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
              />
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

            <div className="form-control relative">
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
                className="input input-bordered"
              />
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-12 right-5 translate-middle-y"
                style={{ cursor: "pointer" }}
              >
                🗝
              </p>
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

            <label className="label">
              <Link
                to="/forgotpassword"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>
            {authError}
            <button
              className="btn btn-primary w-full max-w-xs login"
              type="submit"
            ><ExitToAppIcon className="googlelogo"></ExitToAppIcon>Login</button>
            <label className="label justify-end">
              <Link to="/register" className="label-text-alt link link-hover">
                New Here?Please Register...
              </Link>
            </label>
          </form>
          <div className="divider">OR</div>
          <div className="form-control">
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-primary mb-3 d-flex justify-around items-center login border-0"
            >
              <span><GoogleIcon className="googlelogo"></GoogleIcon>Login With Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;