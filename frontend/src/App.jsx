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
import EventDetail from "./components/events/EventDetail";

// New AuthWrapper component
const AuthWrapper = ({ children, allowGuest = true }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Prevent guest users from accessing non-allowed routes
  if (!allowGuest && user?.isGuest) {
    return <Navigate to="/dashboard" replace />;
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
        <div className="min-h-screen bg-gray-100">
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
                <AuthWrapper allowGuest={true}>
                  <EventDashboard />
                </AuthWrapper>
              }
            />
            <Route
              path="/create-event"
              element={
                <AuthWrapper allowGuest={false}>
                  <EventForm />
                </AuthWrapper>
              }
            />
            <Route
              path="/event/:id"
              element={
                <AuthWrapper allowGuest={true}>
                  <EventDetail />
                </AuthWrapper>
              }
            />
            <Route
              path="/event/edit/:id"
              element={
                <AuthWrapper allowGuest={false}>
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
