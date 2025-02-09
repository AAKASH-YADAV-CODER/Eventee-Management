import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import {
  Calendar,
  PlusCircle,
  LogOut,
  Menu,
  X,
  CircleUser,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const isGuest = user?.isGuest;

    if (isGuest) {
      // Direct logout for guest users
      dispatch(logout());
      toast.success("Guest logged out successfully");
      navigate("/login");
      return;
    }

    try {
      // Regular user logout with API call
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
      dispatch(logout());
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

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-gray-700 border border-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            {!user?.isGuest && (
              <Link
                to="/create-event"
                className="flex items-center border border-gray-900 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Create Event
              </Link>
            )}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 border border-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
              <span className="text-sm text-gray-700 mr-4 flex  items-center">
                <CircleUser className="w-6 h-6 mr-1" />
                {user?.isGuest ? "Guest User" : user?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                className="text-gray-700 border border-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              {!user?.isGuest && (
                <Link
                  to="/create-event"
                  className="flex items-center text-gray-700 border border-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Create Event
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex px-3 py-2 items-center text-gray-700 border border-gray-900 hover:text-red-600 rounded-md text-sm font-medium"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
              <span className="text-sm text-gray-700 pt-2 flex items-center">
                <CircleUser className="w-6 h-6 mr-1" />
                {user?.isGuest ? "Guest User" : user?.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
