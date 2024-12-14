import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserHeader from "./components/UserHeader"; 
import Nav from "./components/Nav";
import Dashboard from "./pages/admin/Dashboard"; 
import Products from "./pages/admin/Products"; 
import Orders from "./pages/admin/Orders"; 
import Settings from "./pages/admin/Settings"; 
import AdminLogin from "./pages/admin/AdminLoginPage"; 
import HomePage from "./pages/store/HomePage";

function App() {
  const username = "JohnDoe";

  // Define admin routes
  const adminRoutes = ["/dashboard", "/products", "/orders", "/settings"];

  // Check if the current route is an admin route
  const isAdminRoute = adminRoutes.includes(location.pathname);

  return (
    <Router>
      <div className="App flex h-screen">
        {/* Sidebar */}
        {isAdminRoute && <Nav />}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {isAdminRoute && <UserHeader username={username} />}
          <div className="p-6 bg-gray-100 flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/dashboard" element={username ? <Dashboard /> : <Navigate to="/admin-login" />} />
              <Route path="/products" element={username ? <Products /> : <Navigate to="/admin-login" />} />
              <Route path="/orders" element={username ? <Orders /> : <Navigate to="/admin-login" />} />
              <Route path="/settings" element={username ? <Settings /> : <Navigate to="/admin-login" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
