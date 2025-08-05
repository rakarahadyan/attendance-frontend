import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import EmployeeDashboard from "./pages/dashboard/Dashboard"; // contoh halaman lain
import MainLayout from "./layouts/MainLayout";
import EmployeeList from "./pages/employees/Employee"; // contoh halaman lain

function App() {
  return (
    <Router>
      <MainLayout>
        <div className="pages-container">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Routes>
        </div>
      </MainLayout>
    </Router>
  );
}

export default App;
