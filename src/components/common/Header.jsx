import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ConfirmationDialog from "./ConfirmationDialog";

// Header Component
const Header = ({
  onMenuClick,
  user = { name: "John Doe", role: "Admin" },
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    // 1. Hapus token dari localStorage/sessionStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2. Jika perlu, panggil endpoint logout (opsional)
    // axios.post('/api/auth/logout').catch(err => console.error(err));

    // 3. Redirect ke halaman login
    navigate("/");
    setShowUserMenu(false);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:flex items-center space-x-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-400">{user.role}</div>
              </div>
              <ChevronDown size={16} className="hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 z-50">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <User size={16} className="mr-3" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <Settings size={16} className="mr-3" />
                  Settings
                </a>
                <hr className="border-gray-700 my-1" />
                <a
                  href="#"
                  onClick={() => setShowDialog(true)}
                  className="flex items-center px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors"
                >
                  <LogOut size={16} className="mr-3" />
                  Logout
                </a>
              </div>
            )}
          </div>

          <ConfirmationDialog
            isOpen={showDialog}
            title="Logout Confirmation"
            description="Are you sure you want to logout?"
            onCancel={() => setShowDialog(false)}
            onConfirm={handleLogout}
            confirmText="Logout"
            cancelText="Cancel"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
