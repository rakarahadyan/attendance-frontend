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
import { useNavigate, useLocation, Link } from "react-router-dom";

// Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "");
  const [activeMenu, setActiveMenu] = useState(currentPath);
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "attendance", label: "Attendance", icon: Clock, href: "/attendance" },
    { id: "employees", label: "Employees", icon: Users, href: "/employees" },
    {
      id: "departments",
      label: "Departments",
      icon: Building2,
      href: "/departments",
    },
    { id: "reports", label: "Reports", icon: BarChart3, href: "/reports" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-700 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg flex items-center justify-center bg-white w-8 h-8">
                {/* <Clock size={20} className="text-white" /> */}
                <img src="/attendance.png" alt="Logo" className="" />
              </div>
              <span className="text-xl font-bold text-white">
                AttendanceApp
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    navigate(item.href);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User info at bottom */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  John Doe
                </div>
                <div className="text-xs text-gray-400 truncate">
                  Administrator
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
