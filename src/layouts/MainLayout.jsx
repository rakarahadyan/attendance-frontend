import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Building2,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  User,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";

// MainLayout Component
const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content - min-width = 100% - 256px (ukuran sidebar) */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{ minWidth: "calc(100% - 16rem)" }}
        >
          {/* Header */}
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            user={{ name: "John Doe", role: "Administrator" }}
          />

          {/* Page content */}
          <main
            className="flex-1 overflow-auto p-6"
            style={{ minWidth: "calc(100vw - 16rem)" }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
