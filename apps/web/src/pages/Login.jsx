import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [loginData, setLoginData] = useState({ identity: "", password: "" });
  const [errorMsg, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Purana error clear karna zaroori hai
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      dispatch(setCredentials(response.data.user));
      navigate("/");
    } catch (error) {
      console.log("Error in logging in", error);
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };
  // const handleForgetPass = () => {};

  // console.log("formdata", loginData);

  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-100 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 tracking-tighter">
          yaari
        </h1>

        {errorMsg && (
          <div className="w-full bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Email address or mobile number"
            name="identity"
            value={loginData.identity}
            onChange={handleChange}
          />

          <input
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <button className="text-blue-500 text-sm mt-4 hover:underline">
          Forgotten password?
        </button>

        <hr className="w-full border-gray-300 my-6" />

        <Link to={"/signup"}>
          <button className="bg-green-500 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 transition">
            Create new account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
