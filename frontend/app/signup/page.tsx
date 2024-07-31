"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Spinner from "../_components/Spinner.jsx";
import { instance } from "../axiosConfig";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await instance.get("/authenticated");
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setEmail("");
      setPassword("");
      setFullName("");
      const response = await instance.post("/auth/register", {
        full_name: fullName,
        email,
        password,
      });
      console.log("Sign up successful:", response.data);
      router.push("/signin");
    } catch (error: AxiosError | any) {
      console.error("Sign up error:", error.response?.data || error.message);
    }
  };
  if (loading) {
    return (
      <div className="relative h-screen w-screen">
        <div className="flex items-center absolute top-1/2 left-1/2 gap-4 -translate-x-1/2 -translate-y-1/2">
          <p className="text-2xl self-end mt-2">Loading...</p>
          <Spinner />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return router.push("/");
  }
  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 shadow-lg p-6 rounded-lg">
        <h2 className="text-4xl font-barlow font-semibold text-center">
          Welcome to <span className="text-primary">Workflo!</span>
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 min-w-[450px]"
        >
          <div className="">
            <input
              type="text"
              placeholder="Full Name"
              className="px-2 py-4 w-full bg-slate-100 outline-none border-b-primary focus:border-b-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="">
            <input
              type="email"
              placeholder="Your Email"
              className="px-2 py-4 w-full bg-slate-100 outline-none border-b-primary focus:border-b-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="">
            <input
              type="password"
              placeholder="Your Password"
              className="px-2 py-4 w-full bg-slate-100 outline-none border-b-primary focus:border-b-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-primary text-white text-center w-full font-barlow py-2 text-lg rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div>
          <h3 className="font-barlow text-center text-lg">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              Log in.
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
