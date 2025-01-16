import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginForm from "./components/auth/LoginForm";
import EventDashboard from "./components/events/EventDashboard";
import EventForm from "./components/events/EventForm";
import Navigation from "./components/Navigation";
import PrivateRoute from "./components/PrivateRoute";
import RegisterForm from "./components/auth/RegisterForm";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <EventDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-event"
              element={
                <PrivateRoute>
                  <EventForm />
                </PrivateRoute>
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
