import React, { useState } from "react";
import { LogIn } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/user/signup",
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      navigate("/login");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center mx-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register Eventee Platform
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-cyan-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-cyan-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              minLength={8}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-cyan-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-cyan-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-cyan-400 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <Link
            to="/login"
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
