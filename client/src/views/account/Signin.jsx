import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function Signin() {
  const [form, setForm] = useState({
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
    toast.success("Signin");
    // alert("Signin");
    // fetch("http://localhost:3001/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // }).then((res) => {
    //   res.json().then((data) => {
    //     if (data.error === null) {
    //       window.location.href = "/dashboard";
    //       localStorage.setItem("token", data.data.token);
    //     } else {
    //       toast.error(data.error);
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
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-8 sm:w-[30rem]">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <span className="font-medium text-[#00000074]">
              Let's signin to your ItSolve account.
            </span>
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

            <div>
              <button
                onClick={handleOnSubmit}
                className="rounded-lg bg-navy-500 px-8 py-4 font-medium text-white duration-300 hover:bg-navy-300"
              >
                Log in
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
        </div>
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
