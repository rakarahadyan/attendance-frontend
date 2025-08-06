import { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Users, 
  TrendingUp, 
  Coffee, 
  LogIn, 
  LogOut,
  Timer,
  User,
  Building2,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  Pause,
  Play
} from 'lucide-react';

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, subtitle, color = 'blue', trend }) => (
  <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 bg-${color}-600 rounded-lg flex items-center justify-center`}>
          <Icon className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-white">{value}</div>
        {trend && (
          <div className={`text-sm ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.value}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Quick Action Button Component
const QuickActionButton = ({ icon: Icon, label, onClick, variant = 'primary', disabled = false }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        flex items-center space-x-3 px-6 py-4 rounded-lg font-medium transition-colors w-full
      `}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
};

// Time Display Component
const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
      <div className="text-4xl font-mono font-bold text-blue-400 mb-2">
        {currentTime.toLocaleTimeString('en-US', { hour12: false })}
      </div>
      <div className="text-gray-400">
        {currentTime.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
};

// Activity Feed Component
const ActivityFeed = ({ activities }) => (
  <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
            ${activity.type === 'clock-in' ? 'bg-green-600' : 
              activity.type === 'clock-out' ? 'bg-red-600' : 
              activity.type === 'break' ? 'bg-yellow-600' : 'bg-blue-600'}
          `}>
            {activity.type === 'clock-in' && <LogIn size={16} className="text-white" />}
            {activity.type === 'clock-out' && <LogOut size={16} className="text-white" />}
            {activity.type === 'break' && <Coffee size={16} className="text-white" />}
            {activity.type === 'other' && <User size={16} className="text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white">{activity.message}</p>
            <p className="text-xs text-gray-400">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Employee Dashboard
const EmployeeDashboard = () => {
  const [attendance, setAttendance] = useState({
    clockedIn: false,
    clockInTime: null,
    onBreak: false,
    breakStartTime: null,
    totalHours: '0:00'
  });

  const handleClockIn = () => {
    setAttendance(prev => ({
      ...prev,
      clockedIn: true,
      clockInTime: new Date().toLocaleTimeString('en-US', { hour12: false })
    }));
  };

  const handleClockOut = () => {
    setAttendance(prev => ({
      ...prev,
      clockedIn: false,
      onBreak: false,
      clockInTime: null,
      breakStartTime: null,
      totalHours: '8:30'
    }));
  };

  const handleBreakToggle = () => {
    setAttendance(prev => ({
      ...prev,
      onBreak: !prev.onBreak,
      breakStartTime: !prev.onBreak ? new Date().toLocaleTimeString('en-US', { hour12: false }) : null
    }));
  };

  const employeeStats = [
    { 
      icon: Clock, 
      title: 'Today\'s Hours', 
      value: attendance.clockedIn ? '4:30' : '0:00', 
      subtitle: 'Working time',
      color: 'blue'
    },
    { 
      icon: Calendar, 
      title: 'This Month', 
      value: '168h', 
      subtitle: 'Total hours',
      color: 'green',
      trend: { positive: true, value: '+5%' }
    },
    { 
      icon: Coffee, 
      title: 'Break Time', 
      value: '45m', 
      subtitle: 'Today',
      color: 'yellow'
    },
    { 
      icon: TrendingUp, 
      title: 'Attendance', 
      value: '96%', 
      subtitle: 'This month',
      color: 'purple',
      trend: { positive: true, value: '+2%' }
    }
  ];

  const recentActivities = [
    { type: 'clock-in', message: 'Clocked in', time: '2 hours ago' },
    { type: 'break', message: 'Started lunch break', time: '30 minutes ago' },
    { type: 'break', message: 'Ended lunch break', time: '15 minutes ago' },
    { type: 'other', message: 'Updated profile information', time: 'Yesterday' },
    { type: 'clock-out', message: 'Clocked out', time: 'Yesterday at 5:30 PM' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, John!</h1>
          <p className="text-gray-400">Here's your attendance overview for today</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`
            w-3 h-3 rounded-full 
            ${attendance.clockedIn ? 'bg-green-400' : 'bg-gray-400'}
          `}></div>
          <span className="text-sm text-gray-400">
            {attendance.clockedIn ? 'Active' : 'Not clocked in'}
          </span>
        </div>
      </div>

      {/* Current Time & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TimeDisplay />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {!attendance.clockedIn ? (
                <QuickActionButton
                  icon={LogIn}
                  label="Clock In"
                  onClick={handleClockIn}
                  variant="success"
                />
              ) : (
                <QuickActionButton
                  icon={LogOut}
                  label="Clock Out"
                  onClick={handleClockOut}
                  variant="danger"
                />
              )}
              
              <QuickActionButton
                icon={attendance.onBreak ? Play : Pause}
                label={attendance.onBreak ? 'End Break' : 'Start Break'}
                onClick={handleBreakToggle}
                variant={attendance.onBreak ? 'success' : 'warning'}
                disabled={!attendance.clockedIn}
              />
            </div>
            
            {attendance.clockedIn && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Clocked in at:</span>
                  <span className="text-white font-medium">{attendance.clockInTime}</span>
                </div>
                {attendance.onBreak && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-400">Break started:</span>
                    <span className="text-yellow-400 font-medium">{attendance.breakStartTime}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employeeStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Activity Feed */}
      <ActivityFeed activities={recentActivities} />
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  const adminStats = [
    { 
      icon: Users, 
      title: 'Total Employees', 
      value: '156', 
      subtitle: 'Active users',
      color: 'blue',
      trend: { positive: true, value: '+12' }
    },
    { 
      icon: CheckCircle, 
      title: 'Present Today', 
      value: '142', 
      subtitle: '91% attendance',
      color: 'green',
      trend: { positive: true, value: '+5%' }
    },
    { 
      icon: XCircle, 
      title: 'Absent Today', 
      value: '8', 
      subtitle: '5% of total',
      color: 'red',
      trend: { positive: false, value: '-2' }
    },
    { 
      icon: Clock, 
      title: 'Late Arrivals', 
      value: '6', 
      subtitle: 'Today',
      color: 'yellow',
      trend: { positive: false, value: '+3' }
    }
  ];

  const departmentStats = [
    { name: 'IT', present: 45, total: 50, percentage: 90 },
    { name: 'HR', present: 12, total: 15, percentage: 80 },
    { name: 'Finance', present: 25, total: 28, percentage: 89 },
    { name: 'Marketing', present: 20, total: 22, percentage: 91 },
    { name: 'Operations', present: 40, total: 41, percentage: 98 }
  ];

  const recentActivities = [
    { type: 'clock-in', message: 'John Doe clocked in', time: '5 minutes ago' },
    { type: 'clock-out', message: 'Jane Smith clocked out', time: '10 minutes ago' },
    { type: 'other', message: 'New employee Mike Johnson added', time: '1 hour ago' },
    { type: 'break', message: 'Sarah Wilson started break', time: '1 hour ago' },
    { type: 'clock-in', message: 'David Brown clocked in late', time: '2 hours ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Monitor attendance and manage your workforce</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Generate Report
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Department Overview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Stats */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Department Overview</h3>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building2 className="text-gray-400" size={20} />
                  <span className="text-white font-medium">{dept.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">
                    {dept.present}/{dept.total}
                  </span>
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`
                        h-2 rounded-full
                        ${dept.percentage >= 90 ? 'bg-green-500' : 
                          dept.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}
                      `}
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-white font-medium w-10">
                    {dept.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <QuickActionButton
              icon={Users}
              label="Manage Employees"
              variant="primary"
            />
            <QuickActionButton
              icon={Building2}
              label="Manage Departments"
              variant="secondary"
            />
            <QuickActionButton
              icon={BarChart3}
              label="View Reports"
              variant="secondary"
            />
            <QuickActionButton
              icon={AlertCircle}
              label="Review Alerts"
              variant="warning"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <ActivityFeed activities={recentActivities} />
    </div>
  );
};

// Main Dashboard Component (switches between employee and admin)
const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  return user.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />;
};

export default Dashboard;