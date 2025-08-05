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
    totalHours: '0:00',
    totalBreakTime: '0:00'
  });

  const [activities, setActivities] = useState([
    {
      type: 'clock-in',
      message: 'Andi Pratama clocked in',
      time: '08:00 AM'
    },
    {
      type: 'break',
      message: 'Sari Indah started break',
      time: '10:15 AM'
    },
    {
      type: 'clock-out',
      message: 'Budi Santoso clocked out',
      time: '17:30 PM'
    }
  ]);

  const [workTime, setWorkTime] = useState('0:00:00');

  // Calculate work time
  useEffect(() => {
    let interval;
    if (attendance.clockedIn && !attendance.onBreak) {
      interval = setInterval(() => {
        if (attendance.clockInTime) {
          const now = new Date();
          const diff = now - attendance.clockInTime;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setWorkTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [attendance.clockedIn, attendance.onBreak, attendance.clockInTime]);

  const handleClockIn = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      clockedIn: true,
      clockInTime: now
    }));
    
    setActivities(prev => [{
      type: 'clock-in',
      message: 'You clocked in',
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }, ...prev]);
  };

  const handleClockOut = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      clockedIn: false,
      clockInTime: null,
      onBreak: false,
      breakStartTime: null
    }));
    
    setActivities(prev => [{
      type: 'clock-out',
      message: 'You clocked out',
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }, ...prev]);
    
    setWorkTime('0:00:00');
  };

  const handleBreakToggle = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      onBreak: !prev.onBreak,
      breakStartTime: !prev.onBreak ? now : null
    }));
    
    setActivities(prev => [{
      type: 'break',
      message: attendance.onBreak ? 'You ended break' : 'You started break',
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }, ...prev]);
  };

  const stats = [
    {
      icon: Clock,
      title: 'Work Hours Today',
      value: workTime,
      subtitle: 'Current session',
      color: 'blue',
      trend: { positive: true, value: '+2.5h from yesterday' }
    },
    {
      icon: Calendar,
      title: 'This Week',
      value: '32.5h',
      subtitle: 'Total work hours',
      color: 'green',
      trend: { positive: true, value: '+5.2h from last week' }
    },
    {
      icon: Coffee,
      title: 'Break Time',
      value: '45m',
      subtitle: 'Today\'s breaks',
      color: 'yellow',
      trend: { positive: false, value: '+10m from average' }
    },
    {
      icon: TrendingUp,
      title: 'Productivity',
      value: '94%',
      subtitle: 'This week',
      color: 'purple',
      trend: { positive: true, value: '+3% from last week' }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      {/* <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 className="text-blue-400" size={32} />
            <div>
              <h1 className="text-2xl font-bold">AttendanceApp</h1>
              <p className="text-gray-400">Employee Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="font-semibold">John Doe</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
          </div>
        </div>
      </div> */}

      <div className="p-6 space-y-6">
        {/* Time Display and Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TimeDisplay />
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Current Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  attendance.clockedIn 
                    ? attendance.onBreak 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}>
                  {attendance.clockedIn 
                    ? attendance.onBreak 
                      ? 'On Break' 
                      : 'Working'
                    : 'Clocked Out'}
                </span>
              </div>
              {attendance.clockInTime && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Clock In:</span>
                  <span className="text-white">
                    {attendance.clockInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions and Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {!attendance.clockedIn ? (
                  <QuickActionButton
                    icon={LogIn}
                    label="Clock In"
                    onClick={handleClockIn}
                    variant="success"
                  />
                ) : (
                  <>
                    <QuickActionButton
                      icon={LogOut}
                      label="Clock Out"
                      onClick={handleClockOut}
                      variant="danger"
                    />
                    <QuickActionButton
                      icon={attendance.onBreak ? Play : Pause}
                      label={attendance.onBreak ? "End Break" : "Start Break"}
                      onClick={handleBreakToggle}
                      variant="warning"
                    />
                  </>
                )}
                <QuickActionButton
                  icon={BarChart3}
                  label="View Reports"
                  onClick={() => alert('Reports feature coming soon!')}
                  variant="secondary"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <ActivityFeed activities={activities} />
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">This Week's Schedule</h3>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm text-gray-400 mb-1">{day}</div>
                <div className={`
                  w-full h-20 rounded-lg flex flex-col items-center justify-center text-sm
                  ${index < 5 ? 'bg-blue-600' : 'bg-gray-700'}
                `}>
                  {index < 5 ? (
                    <>
                      <div className="font-semibold">8:00 - 17:00</div>
                      <div className="text-xs">8 hours</div>
                    </>
                  ) : (
                    <div className="text-gray-400">Rest Day</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;