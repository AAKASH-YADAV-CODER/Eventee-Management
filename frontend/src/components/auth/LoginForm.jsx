import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { guestLogin, login } from "../../store/slices/authSlice";
import { LogIn, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(login(response.data.data.user));
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center mx-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Eventee Platform
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-cyan-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-cyan-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-cyan-400 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <Link
            to="/signup"
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Don't have an account? Sign up
          </Link>
        </div>
        <div className="mt-4">
          <button
            onClick={() => {
              try {
                dispatch(guestLogin());
                toast.success("Guest logged in successfully");
              } catch (error) {
                toast.error("Guest login failed");
              }
            }}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
