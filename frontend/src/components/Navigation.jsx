import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Calendar, PlusCircle, LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:1000/api/v1/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="flex items-center text-xl font-bold text-blue-600"
            >
              <Calendar className="w-6 h-6 mr-2" />
              EventHub
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/create-event"
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Create Event
            </Link>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">
                {user?.isGuest ? "Guest User" : user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
