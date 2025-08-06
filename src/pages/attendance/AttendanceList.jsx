import { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  LogIn, 
  LogOut, 
  Coffee, 
  Play, 
  Pause,
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  BarChart3,
  TrendingUp,
  Timer
} from 'lucide-react';

// Time Display Component
const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="text-6xl font-mono font-bold text-blue-400 mb-2">
        {currentTime.toLocaleTimeString('en-US', { hour12: false })}
      </div>
      <div className="text-lg text-gray-400">
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

// Attendance Reports Component
const AttendanceReports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  const reportTypes = [
    { value: 'daily', label: 'Daily Report' },
    { value: 'weekly', label: 'Weekly Report' },
    { value: 'monthly', label: 'Monthly Report' },
    { value: 'employee', label: 'Employee Report' }
  ];

  const summaryStats = [
    { 
      icon: CheckCircle, 
      title: 'Total Present', 
      value: '1,240', 
      color: 'green',
      percentage: '89%'
    },
    { 
      icon: XCircle, 
      title: 'Total Absent', 
      value: '85', 
      color: 'red',
      percentage: '6%'
    },
    { 
      icon: AlertCircle, 
      title: 'Late Arrivals', 
      value: '72', 
      color: 'yellow',
      percentage: '5%'
    },
    { 
      icon: TrendingUp, 
      title: 'Overtime Hours', 
      value: '156', 
      color: 'blue',
      percentage: '+12%'
    }
  ];

  const departmentStats = [
    { name: 'IT', present: 89, late: 5, absent: 6, total: 100 },
    { name: 'HR', present: 92, late: 3, absent: 5, total: 100 },
    { name: 'Finance', present: 95, late: 2, absent: 3, total: 100 },
    { name: 'Marketing', present: 87, late: 8, absent: 5, total: 100 },
    { name: 'Operations', present: 91, late: 4, absent: 5, total: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance Reports</h1>
          <p className="text-gray-400">Analyze attendance patterns and trends</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export PDF</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Report Filters */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-600 rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className={`text-sm font-medium text-${stat.color}-400`}>
                  {stat.percentage}
                </div>
              </div>
              <h3 className="text-sm text-gray-400 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Department Performance */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Department Performance</h3>
        <div className="space-y-4">
          {departmentStats.map((dept, index) => (
            <div key={index} className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{dept.name}</h4>
                <span className="text-sm text-gray-400">
                  {dept.present + dept.late}/{dept.total} employees
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">{dept.present}%</div>
                  <div className="text-xs text-gray-400">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-400">{dept.late}%</div>
                  <div className="text-xs text-gray-400">Late</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">{dept.absent}%</div>
                  <div className="text-xs text-gray-400">Absent</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500" 
                    style={{ width: `${dept.present}%` }}
                  ></div>
                  <div 
                    className="bg-yellow-500" 
                    style={{ width: `${dept.late}%` }}
                  ></div>
                  <div 
                    className="bg-red-500" 
                    style={{ width: `${dept.absent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Trends Chart Placeholder */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Attendance Trends</h3>
        <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-400">Chart visualization would go here</p>
            <p className="text-sm text-gray-500">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Attendance Management Component
const AttendanceManagement = ({ view = 'clockinout' }) => {
  const [currentView, setCurrentView] = useState(view);

  const views = [
    { id: 'clockinout', label: 'Clock In/Out', component: ClockInOut },
    { id: 'list', label: 'Attendance List', component: AttendanceList },
    { id: 'reports', label: 'Reports', component: AttendanceReports }
  ];

  const CurrentComponent = views.find(v => v.id === currentView)?.component || ClockInOut;

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-1">
        <div className="flex space-x-1">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`
                flex-1 px-4 py-2 rounded-lg font-medium transition-colors
                ${currentView === view.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }
              `}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current View Content */}
      <CurrentComponent />
    </div>
  );
};

// Clock In/Out Interface
const ClockInOut = () => {
  const [attendance, setAttendance] = useState({
    clockedIn: false,
    clockInTime: null,
    onBreak: false,
    breakStartTime: null,
    totalWorkTime: '0:00',
    totalBreakTime: '0:15'
  });

  const handleClockIn = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      clockedIn: true,
      clockInTime: now.toLocaleTimeString('en-US', { hour12: false })
    }));
  };

  const handleClockOut = () => {
    setAttendance(prev => ({
      ...prev,
      clockedIn: false,
      onBreak: false,
      clockInTime: null,
      breakStartTime: null,
      totalWorkTime: '8:15'
    }));
  };

  const handleBreakToggle = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      onBreak: !prev.onBreak,
      breakStartTime: !prev.onBreak ? now.toLocaleTimeString('en-US', { hour12: false }) : null
    }));
  };

  return (
    <div className="space-y-6">
      {/* Live Clock */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
        <LiveClock />
      </div>

      {/* Clock Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Clock In/Out</h3>
          <div className="space-y-4">
            {!attendance.clockedIn ? (
              <button
                onClick={handleClockIn}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3"
              >
                <LogIn size={24} />
                <span className="text-lg">Clock In</span>
              </button>
            ) : (
              <button
                onClick={handleClockOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3"
              >
                <LogOut size={24} />
                <span className="text-lg">Clock Out</span>
              </button>
            )}

            <button
              onClick={handleBreakToggle}
              disabled={!attendance.clockedIn}
              className={`
                w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3
                ${!attendance.clockedIn 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : attendance.onBreak 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                }
              `}
            >
              {attendance.onBreak ? <Play size={20} /> : <Pause size={20} />}
              <span>{attendance.onBreak ? 'End Break' : 'Start Break'}</span>
            </button>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Today's Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Status</span>
              <span className={`
                font-medium
                ${attendance.clockedIn ? 'text-green-400' : 'text-gray-400'}
              `}>
                {attendance.onBreak ? 'On Break' : attendance.clockedIn ? 'Working' : 'Not Clocked In'}
              </span>
            </div>
            
            {attendance.clockInTime && (
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Clock In Time</span>
                <span className="text-white font-medium">{attendance.clockInTime}</span>
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Work Time</span>
              <span className="text-white font-medium">{attendance.totalWorkTime}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-400">Break Time</span>
              <span className="text-white font-medium">{attendance.totalBreakTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Attendance List Component
const AttendanceList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');

  const attendanceRecords = [
    {
      id: 1,
      employee: { name: 'John Doe', id: 'EMP001' },
      date: '2024-01-15',
      clockIn: '08:30',
      clockOut: '17:15',
      breakStart: '12:00',
      breakEnd: '13:00',
      totalHours: '7:45',
      status: 'Present',
      notes: 'On time'
    },
    {
      id: 2,
      employee: { name: 'Jane Smith', id: 'EMP002' },
      date: '2024-01-15',
      clockIn: '09:15',
      clockOut: '17:30',
      breakStart: '12:30',
      breakEnd: '13:30',
      totalHours: '7:15',
      status: 'Late',
      notes: 'Traffic delay'
    },
    {
      id: 3,
      employee: { name: 'Mike Johnson', id: 'EMP003' },
      date: '2024-01-15',
      clockIn: null,
      clockOut: null,
      breakStart: null,
      breakEnd: null,
      totalHours: '0:00',
      status: 'Absent',
      notes: 'Sick leave'
    },
    {
      id: 4,
      employee: { name: 'Sarah Wilson', id: 'EMP004' },
      date: '2024-01-15',
      clockIn: '08:00',
      clockOut: '19:30',
      breakStart: '12:00',
      breakEnd: '13:00',
      totalHours: '10:30',
      status: 'Overtime',
      notes: 'Project deadline'
    }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Present', label: 'Present' },
    { value: 'Late', label: 'Late' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Overtime', label: 'Overtime' }
  ];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || record.date === filterDate;
    const matchesStatus = !filterStatus || record.status === filterStatus;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-600 text-white';
      case 'Late': return 'bg-yellow-600 text-white';
      case 'Absent': return 'bg-red-600 text-white';
      case 'Overtime': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance Records</h1>
          <p className="text-gray-400">Track and manage employee attendance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <BarChart3 size={16} />
            <span>Reports</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {filteredRecords.length} records
            </span>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Employee</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Clock In</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Clock Out</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Break</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Total Hours</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-800 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="text-white" size={16} />
                      </div>
                      <div>
                        <div className="text-white font-medium">{record.employee.name}</div>
                        <div className="text-sm text-gray-400">{record.employee.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{record.date}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {record.clockIn ? (
                        <>
                          <LogIn className="text-green-400" size={16} />
                          <span className="text-white">{record.clockIn}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {record.clockOut ? (
                        <>
                          <LogOut className="text-red-400" size={16} />
                          <span className="text-white">{record.clockOut}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {record.breakStart && record.breakEnd ? (
                      <div className="flex items-center space-x-2">
                        <Coffee className="text-yellow-400" size={16} />
                        <span className="text-white text-sm">
                          {record.breakStart} - {record.breakEnd}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="text-blue-400" size={16} />
                      <span className="text-white font-medium">{record.totalHours}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300 text-sm">{record.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Clock className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No attendance records found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;