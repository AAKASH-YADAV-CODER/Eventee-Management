import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import EventDashboard from "./components/events/EventDashboard";
import EventForm from "./components/events/EventForm";
import Navigation from "./components/Navigation";
import RegisterForm from "./components/auth/RegisterForm";

// New AuthWrapper component
const AuthWrapper = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// New PublicRoute component
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthWrapper>
                  <EventDashboard />
                </AuthWrapper>
              }
            />
            <Route
              path="/create-event"
              element={
                <AuthWrapper>
                  <EventForm />
                </AuthWrapper>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
