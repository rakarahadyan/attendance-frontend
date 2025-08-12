import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import MainLayout from "./layouts/MainLayout";
import EmployeeList from "./pages/employees/Employee";
import AttendanceManagement from "./pages/attendance/AttendanceList";

const Departments = () => <div>Departments</div>;
const Reports = () => <div>Reports</div>;
const Settings = () => <div>Settings</div>;

function App() {
  return (
    <Router basename="/attendance-apps">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
