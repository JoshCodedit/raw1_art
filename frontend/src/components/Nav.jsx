import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      <nav className="flex flex-col mt-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `user-nav-link ${isActive ? "user-nav-link-active" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `user-nav-link ${isActive ? "user-nav-link-active" : ""}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `user-nav-link ${isActive ? "user-nav-link-active" : ""}`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `user-nav-link ${isActive ? "user-nav-link-active" : ""}`
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
}
