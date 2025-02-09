import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, logout } from "../../store/slices/authSlice";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "https://eventee-management.onrender.com/api/v1/user/check-auth",
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(login(response.data.data.user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};

export default AuthCheck;
