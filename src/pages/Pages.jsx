import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/Login";
import MainLayout from "../components/common/MainLayout";

const Pages = () => {
  return (
    <Router>
      <MainLayout>
        <div className="pages-container">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
          </Routes>
        </div>
      </MainLayout>
    </Router>
  );
};

export default Pages;
