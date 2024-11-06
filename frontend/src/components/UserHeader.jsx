// UserHeader.js
import React from "react";

const UserHeader = ({ username }) => {
  return (
    <header className="flex items-center p-4 bg-user-dash-main text-white shadow-md">
      {/* Display Username */}
      <div className="text-lg font-semibold">
        <h2>USername</h2>
      </div>

      {/* Search Bar */}
      <div className="m-auto">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-[600px] rounded bg-white text-gray-300 placeholder-user-dash-main focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
    </header>
  );
};

export default UserHeader;
