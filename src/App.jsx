import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/login";
import Signup from "./pages/signup";

const App = () => {
  const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("userEmail");
  
    useEffect(() => {
      if (!storedToken) {
        // Redirect to the login page if no valid token is present
        navigate("/login");
      }
    }, [storedToken]);
  
    // Render the protected routes only if there is a valid token
    return storedToken ? <>{children}</> : null;
  };
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      {/* Protected route */}
      <Route
        path="/*"
        element={<AuthGuard>
          <Sidebar/>
        </AuthGuard>}
      />
    </Routes>
  );
};

export default App;
