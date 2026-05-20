import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
        return;
      }
      if (error instanceof Error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-[#005f73] via-[#0a9396] to-[#00acb0] px-4 py-12 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00ffd2]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0a9396]/20 blur-[120px] pointer-events-none" />

      {/* Main card container */}
      <div className="relative bg-[#182035] w-full max-w-sm rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] px-8 pt-20 pb-8 flex flex-col gap-6 border border-slate-800/40">
        {/* Overlapping top header tab */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#00f5d4] text-[#101726] px-12 py-2.5 font-extrabold text-sm tracking-widest rounded-sm shadow-[0_4px_12px_rgba(0,245,212,0.35)] select-none">
          SIGN IN
        </div>

        {/* Top waves vector backdrop */}
        <div className="absolute top-0 left-0 right-0 h-44 overflow-hidden rounded-t-xl pointer-events-none select-none">
          {/* Wave Layer 1 */}
          <svg
            className="absolute top-0 left-0 w-full h-full text-slate-700/20 fill-current"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L500,0 L500,90 C400,130 300,75 0,115 Z" />
          </svg>
          {/* Wave Layer 2 */}
          <svg
            className="absolute top-0 left-0 w-full h-full text-slate-600/10 fill-current"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L500,0 L500,120 C360,80 260,150 0,100 Z" />
          </svg>
        </div>

        {/* Circular Avatar Wrapper */}
        <div className="relative z-10 mx-auto w-24 h-24 rounded-full border border-slate-500/30 flex items-center justify-center bg-slate-800/30 backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.15)] select-none">
          <div className="w-20 h-20 rounded-full border border-slate-400/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-400/80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* Input & Form Area */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 z-10">
          {/* Username Field */}
          <div className="flex items-center bg-[#252d43] border border-slate-700/35 rounded-md px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#00f5d4]/40 focus-within:border-[#00f5d4]/40 transition-all duration-200">
            <div className="text-slate-400 select-none">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            {/* Divider */}
            <div className="w-px h-5 bg-slate-600/40 mx-3 select-none" />
            <input
              type="email"
              name="email"
              placeholder="username"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500 text-sm font-light tracking-wide focus:ring-0 p-0"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-[#252d43] border border-slate-700/35 rounded-md px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#00f5d4]/40 focus-within:border-[#00f5d4]/40 transition-all duration-200">
            <div className="text-slate-400 select-none">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
            {/* Divider */}
            <div className="w-px h-5 bg-slate-600/40 mx-3 select-none" />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500 text-sm font-light tracking-wide focus:ring-0 p-0"
            />
          </div>

          {/* Checkbox and Forgot Password Link */}
          <div className="flex items-center justify-between text-[11px] font-medium px-1 select-none">
            <label className="flex items-center gap-1.5 text-[#00f5d4]/90 cursor-pointer hover:text-[#00f5d4] transition-all">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border border-[#00f5d4]/40 bg-transparent text-[#00f5d4] focus:ring-0 focus:ring-offset-0 accent-[#252d43] cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="text-[#00c2b2] hover:text-[#00f5d4] transition-all duration-200"
            >
              Forgot your password?
            </a>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#00f5d4] hover:bg-[#00ffd2] text-[#101726] font-bold py-3 rounded-md tracking-widest text-sm uppercase shadow-[0_4px_15px_rgba(0,245,212,0.3)] hover:shadow-[0_6px_22px_rgba(0,245,212,0.5)] transition-all duration-300 transform active:scale-[0.98] mt-2 cursor-pointer"
          >
            LOGIN
          </button>

          {/* Register Link */}
          <p className="text-slate-400 text-center text-xs mt-1">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#00f5d4] hover:text-[#00ffd2] hover:underline font-semibold transition-all duration-200"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
