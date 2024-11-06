import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./pages/AdminLoginPage"; // Ensure this path is correct
import UserDash from "./pages/UserDashPage"; // Ensure this path is correct

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/admin-login" />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/UserDash" element={<UserDash />} />{" "}
          {/* Change 'component' to 'element' */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
