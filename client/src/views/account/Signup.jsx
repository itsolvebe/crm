import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  //   const { auth } = useAuthContext();

  //   if (!auth.loading && auth.isLogged) {
  //     window.location.href = "/dashboard";
  //   }

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    toast.success("Signup");

    // fetch("http://localhost:3001/api/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // }).then((res) => {
    //   res.json().then((data) => {
    //     if (data.error === null) {
    //       window.location.href = "/login";
    //     } else {
    //       alert(data.error);
    //     }
    //   });
    // });
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOnSubmit(e);
    }
  };

  return (
    <div className="flex h-screen w-screen p-4">
      <Toaster />
      <div className="hidden h-full flex-col justify-center gap-8 rounded-2xl bg-[#0D1623] p-16 xl:flex xl:w-full ">
        <img
          src={require("../../assets/logos/logo_white.png")}
          style={{ width: "75%", height: "30%" }}
          alt="Logo"
        />
        <h1 className="text-5xl font-bold leading-relaxed text-white">
          <span className="text-transparent bg-gradient-to-r from-[#01A0C4] to-[#25C3E6] bg-clip-text">
            No more waiting
          </span>
          , get your project done on your own timeline.
        </h1>
        <p className="text-lg text-[#FFFFFF70]">
          The only platform you need for all your service needs
        </p>
      </div>
      <div className="flex h-full w-full flex-col justify-center gap-6 py-16 px-4 sm:px-24">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <span className="font-medium text-[#00000074]">
            Let's create your ItSolve account first.
          </span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex w-full gap-4 sm:gap-12">
            <div className="flex w-full flex-col gap-2">
              <label className="font-medium text-[#00000074]">First name</label>
              <input
                type="text"
                placeholder="John"
                id="firstName"
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                className="bg-transparent w-full rounded-lg border-2 border-[#0000001A] px-4 py-2 outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label className="font-medium text-[#00000074]">Last name</label>
              <input
                type="text"
                placeholder="Doe"
                id="lastName"
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                className="bg-transparent w-full rounded-lg border-2 border-[#0000001A] px-4 py-2 outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label className="font-medium text-[#00000074]">
              Email address
            </label>
            <input
              type="text"
              placeholder="john@itsolve.be"
              id="email"
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className="bg-transparent w-full rounded-lg border-2 border-[#0000001A] px-4 py-2 outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label className="font-medium text-[#00000074]">Password</label>
            <input
              type="password"
              placeholder="•••••••••"
              id="password"
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className="bg-transparent w-full rounded-lg border-2 border-[#0000001A] px-4 py-2 outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label className="font-medium text-[#00000074]">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="•••••••••"
              id="password"
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className="bg-transparent w-full rounded-lg border-2 border-[#0000001A] px-4 py-2 outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label className="font-medium text-[#00000074]">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="+1 (555) 123 4567"
              id="password"
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className="bg-transparent w-full rounded-lg border-2 border-[#0000001A] px-4 py-2 outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none"
            />
          </div>

          <div>
            <button
              className="rounded-lg bg-navy-500 px-8 py-4 font-medium text-white duration-300 hover:bg-navy-300"
              onClick={(e) => handleOnSubmit(e)}
            >
              Create account
            </button>
          </div>

          <div>
            <span className="font-medium text-[#00000074]">
              Already have an account?{" "}
            </span>
            <Link to={"/signin"} className="font-medium text-navy-400">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
