import { useState, useEffect } from "react";
import { Eye, EyeOff, Clock, User, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Input Field Component
const InputField = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  error,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-400 transition-colors
            ${Icon ? "pl-11" : "px-4"}
            ${showPasswordToggle ? "pr-11" : "px-4"}
            ${
              error
                ? "border-red-500 focus:border-red-400 focus:ring-red-400"
                : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Login Form Component
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate validation
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // axios to send formData to the server
      axios
        .post("http://103.235.75.135/api/auth/login", formData)
        .then((response) => {
          // Handle successful login
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          setFormData({ email: "", password: "" });
          setErrors({});
          // Redirect to dashboard
          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle error
          setErrors({ general: "Login failed. Please try again." });
          console.error("Login error:", error);
        });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <InputField
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        icon={User}
        value={formData.email}
        onChange={handleInputChange("email")}
        error={errors.email}
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        icon={Lock}
        value={formData.password}
        onChange={handleInputChange("password")}
        error={errors.password}
        showPasswordToggle={true}
      />

      <div className="flex items-center">
        <a
          href="#"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`
          w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed
          text-white font-medium py-3 px-4 rounded-lg transition-colors
          flex items-center justify-center space-x-2
        `}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </button>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
    <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
      <Icon className="text-white" size={24} />
    </div>
    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
    <p className="text-2xl font-bold text-blue-400 mb-2">{value}</p>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

// Main Login Page Component
const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to dashboard if already logged in
      navigate("/dashboard");
    }
  }, [navigate]);

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-950 flex" style={{ width: "100vw" }}>
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
              {/* <Clock className="text-white" size={32} /> */}
              <img src="/attendance.png" alt="Logo" className="" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your attendance account</p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Demo Credentials */}
          {/* <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Demo Credentials:
            </h4>
            <div className="space-y-1 text-xs text-gray-400">
              <div>Admin: admin@company.com / password</div>
              <div>Employee: john@company.com / password</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// {/* Right Side - Info Panel */}
//       <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 items-center justify-center px-12">
//         <div className="max-w-lg text-center space-y-8">
//           {/* Current Time Display */}
//           <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
//             <div className="text-5xl font-bold text-white mb-2">{currentTime}</div>
//             <div className="text-blue-100">{currentDate}</div>
//           </div>

//           {/* Company Stats */}
//           <div className="grid grid-cols-2 gap-4">
//             <StatsCard
//               icon={User}
//               title="Employees"
//               value="156"
//               description="Total registered"
//             />
//             <StatsCard
//               icon={Clock}
//               title="Present"
//               value="142"
//               description="Today's attendance"
//             />
//           </div>

//           {/* Welcome Message */}
//           <div className="text-center space-y-4">
//             <h2 className="text-2xl font-bold text-white">
//               Efficient Attendance Management
//             </h2>
//             <p className="text-blue-100 leading-relaxed">
//               Track your work hours, manage attendance, and stay connected with your team.
//               Simple, secure, and reliable attendance tracking for modern workplaces.
//             </p>
//           </div>

//           {/* Features List */}
//           <div className="text-left space-y-3">
//             <div className="flex items-center space-x-3 text-blue-100">
//               <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
//               <span>Real-time clock in/out tracking</span>
//             </div>
//             <div className="flex items-center space-x-3 text-blue-100">
//               <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
//               <span>Comprehensive attendance reports</span>
//             </div>
//             <div className="flex items-center space-x-3 text-blue-100">
//               <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
//               <span>Employee management system</span>
//             </div>
//             <div className="flex items-center space-x-3 text-blue-100">
//               <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
//               <span>Department-wise analytics</span>
//             </div>
//           </div>
//         </div>
//       </div>

export default LoginPage;
