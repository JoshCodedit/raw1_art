import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  // Function to check if the current link is active
  const getLinkClass = (path) => {
    return location.pathname === path ? "user-nav-link user-nav-link-active" : "user-nav-link";
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-user-dash-main text-white">
      <nav className="flex flex-col mt-[72px]">
        <Link to="/dashboard" className={getLinkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/products" className={getLinkClass("/products")}>
          Products
        </Link>

        <Link to="/orders" className={getLinkClass("/orders")}>
          Orders
        </Link>

        <Link to="/settings" className={getLinkClass("/settings")}>
          Settings
        </Link>
      </nav>
    </div>
  );
}
