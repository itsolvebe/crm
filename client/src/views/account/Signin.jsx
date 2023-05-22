import Error from "components/error/Error";
import Spinner from "components/spinner/Spinner";
import { userLogin } from "features/auth/authActions";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(submitForm)();
    }
  };

  return (
    <div className="flex h-screen w-screen p-4">
      <Toaster />

      <div className="flex h-full w-full flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex w-full flex-col gap-8 sm:w-[30rem]"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <span className="font-medium text-[#00000074]">
              Let's signin to your ItSolve account.
            </span>
            {error && <Error>{error}</Error>}
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex w-full flex-col gap-2">
              <label className="font-medium text-[#00000074]">
                Email address
              </label>
              <input
                type="text"
                placeholder="john@itsolve.be"
                id="email"
                {...register("email")}
                onKeyDown={handleOnKeyDown}
                className="bg-transparent w-full rounded-lg border-2 border-[#0000001A] px-4 py-2 outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
                required
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label className="font-medium text-[#00000074]">Password</label>
              <input
                type="password"
                placeholder="•••••••••"
                id="password"
                {...register("password")}
                onKeyDown={handleOnKeyDown}
                className="bg-transparent w-full rounded-lg border-2 border-[#0000001A] px-4 py-2 outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-navy-500 px-8 py-4 font-medium text-white duration-300 hover:bg-navy-300"
              >
                {loading ? <Spinner /> : "Log in"}
              </button>
            </div>

            <div>
              <span className="font-medium text-[#00000074]">
                Don't have an account?{" "}
              </span>
              <Link to={"/signup"} className="font-medium text-navy-400">
                Sign up here
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden h-full flex-col justify-center gap-8 rounded-2xl bg-[#0D1623] p-16 lg:flex lg:w-full">
        <img
          src={require("../../assets/logos/logo_white.png")}
          style={{ width: "75%", height: "30%" }}
          alt="Logo"
        />

        <h1 className="text-5xl font-bold leading-relaxed text-white">
          <span className="text-transparent bg-gradient-to-r from-[#01A0C4] to-[#25C3E6] bg-clip-text">
            Say goodbye{" "}
          </span>
          to the frustration of freelancing and hello to success with us!
        </h1>
        <p className="text-lg text-[#FFFFFF70]">
          No more endless browsing, click and make your idea into reality
        </p>
      </div>
    </div>
  );
}

export default Signin;
