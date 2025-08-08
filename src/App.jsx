import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard"; // contoh halaman lain
import MainLayout from "./layouts/MainLayout";
import EmployeeList from "./pages/employees/Employee"; // contoh halaman lain
import AttendanceManagement from "./pages/attendance/AttendanceList"; // contoh halaman lain

const departments = () => {
  return <div>Departments</div>;
};

const reports = () => {
  return <div>Reports</div>;
};

const settings = () => {
  return <div>Settings</div>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
          <Route path="/departments" element={<departments />} />
          <Route path="/reports" element={<reports />} />
          <Route path="/settings" element={<settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
