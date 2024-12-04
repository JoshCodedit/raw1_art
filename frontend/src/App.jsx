import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLoginPage"; 
import UserHeader from "./components/UserHeader"; 
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard"; 
import Products from "./pages/Products"; 

function App() {
  const username = "JohnDoe";

  return (
    <Router>
      <div className="App flex h-screen">
        {/* Sidebar */}
        <Nav />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <UserHeader username={username} />
          <div className="p-6 bg-gray-100 flex-1">
            <Routes>
              <Route
                path="/"
                element={username ? <Navigate to="/dashboard" /> : <Navigate to="/admin-login" />}
              />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/dashboard"
                element={username ? <Dashboard /> : <Navigate to="/admin-login" />}
              />
              <Route
                path="/products"
                element={username ? <Products /> : <Navigate to="/admin-login" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;
