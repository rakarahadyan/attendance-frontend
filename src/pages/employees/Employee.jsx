import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building2,
  X,
  Save,
  ChevronDown,
  MoreVertical,
  UserCheck,
  UserX
} from 'lucide-react';

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-gray-900 border border-gray-700 rounded-lg w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, type = 'text', value, onChange, placeholder, required = false, error }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full bg-gray-800 border rounded-lg px-4 py-2.5 text-white placeholder-gray-400 transition-colors
        ${error ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
    />
    {error && <p className="text-red-400 text-sm">{error}</p>}
  </div>
);

// Select Field Component
const SelectField = ({ label, value, onChange, options, placeholder, required = false, error }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      className={`
        w-full bg-gray-800 border rounded-lg px-4 py-2.5 text-white transition-colors
        ${error ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      `}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-400 text-sm">{error}</p>}
  </div>
);

// Employee Form Component
const EmployeeForm = ({ employee = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    employeeId: employee?.employeeId || '',
    fullName: employee?.fullName || '',
    position: employee?.position || '',
    department: employee?.department || '',
    phone: employee?.phone || '',
    address: employee?.address || '',
    hireDate: employee?.hireDate || '',
    salary: employee?.salary || '',
    workStartTime: employee?.workStartTime || '08:00',
    workEndTime: employee?.workEndTime || '17:00',
    isActive: employee?.isActive ?? true
  });

  const [errors, setErrors] = useState({});

  const departments = [
    { value: 'it', label: 'Information Technology' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operations' }
  ];

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Department is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Name"
          value={formData.name}
          onChange={handleInputChange('name')}
          placeholder="Enter full name"
          required
          error={errors.name}
        />
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          placeholder="Enter email address"
          required
          error={errors.email}
        />
        <InputField
          label="Employee ID"
          value={formData.employeeId}
          onChange={handleInputChange('employeeId')}
          placeholder="Enter employee ID"
          required
          error={errors.employeeId}
        />
        <InputField
          label="Position"
          value={formData.position}
          onChange={handleInputChange('position')}
          placeholder="Enter position"
          required
          error={errors.position}
        />
        <SelectField
          label="Department"
          value={formData.department}
          onChange={handleInputChange('department')}
          options={departments}
          placeholder="Select department"
          required
          error={errors.department}
        />
        <InputField
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          placeholder="Enter phone number"
        />
        <InputField
          label="Hire Date"
          type="date"
          value={formData.hireDate}
          onChange={handleInputChange('hireDate')}
        />
        <InputField
          label="Salary"
          type="number"
          value={formData.salary}
          onChange={handleInputChange('salary')}
          placeholder="Enter salary"
        />
        <InputField
          label="Work Start Time"
          type="time"
          value={formData.workStartTime}
          onChange={handleInputChange('workStartTime')}
        />
        <InputField
          label="Work End Time"
          type="time"
          value={formData.workEndTime}
          onChange={handleInputChange('workEndTime')}
        />
      </div>

      <div className="space-y-4">
        <InputField
          label="Address"
          value={formData.address}
          onChange={handleInputChange('address')}
          placeholder="Enter address"
        />
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm text-gray-300">
            Active Employee
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Save size={16} />
          <span>{employee ? 'Update' : 'Create'} Employee</span>
        </button>
      </div>
    </div>
  );
};

// Employee Detail Component
const EmployeeDetail = ({ employee, onClose, onEdit }) => (
  <div className="space-y-6">
    {/* Employee Header */}
    <div className="flex items-start space-x-4">
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
        <User className="text-white" size={32} />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-white">{employee.name}</h3>
        <p className="text-gray-400">{employee.position}</p>
        <div className="flex items-center space-x-4 mt-2">
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${employee.isActive ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}
          `}>
            {employee.isActive ? 'Active' : 'Inactive'}
          </span>
          <span className="text-sm text-gray-400">ID: {employee.employeeId}</span>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
      >
        <Edit size={16} />
        <span>Edit</span>
      </button>
    </div>

    {/* Employee Details */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Personal Information</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="text-gray-400" size={16} />
            <span className="text-gray-300">{employee.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="text-gray-400" size={16} />
            <span className="text-gray-300">{employee.phone || 'Not provided'}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="text-gray-400" size={16} />
            <span className="text-gray-300">{employee.address || 'Not provided'}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Work Information</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Building2 className="text-gray-400" size={16} />
            <span className="text-gray-300">{employee.department}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="text-gray-400" size={16} />
            <span className="text-gray-300">Hired: {employee.hireDate}</span>
          </div>
          <div className="flex items-center space-x-3">
            <User className="text-gray-400" size={16} />
            <span className="text-gray-300">Salary: ${employee.salary?.toLocaleString() || 'Not specified'}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Work Schedule */}
    <div className="bg-gray-800 rounded-lg p-4">
      <h4 className="text-lg font-semibold text-white mb-3">Work Schedule</h4>
      <div className="flex items-center space-x-6">
        <div>
          <span className="text-sm text-gray-400">Start Time</span>
          <div className="text-white font-medium">{employee.workStartTime}</div>
        </div>
        <div>
          <span className="text-sm text-gray-400">End Time</span>
          <div className="text-white font-medium">{employee.workEndTime}</div>
        </div>
        <div>
          <span className="text-sm text-gray-400">Hours per Day</span>
          <div className="text-white font-medium">8 hours</div>
        </div>
      </div>
    </div>

    {/* Recent Attendance */}
    <div className="bg-gray-800 rounded-lg p-4">
      <h4 className="text-lg font-semibold text-white mb-3">Recent Attendance</h4>
      <div className="space-y-2">
        {[
          { date: '2024-01-15', status: 'Present', clockIn: '08:30', clockOut: '17:15' },
          { date: '2024-01-14', status: 'Present', clockIn: '08:25', clockOut: '17:10' },
          { date: '2024-01-13', status: 'Late', clockIn: '09:15', clockOut: '17:30' },
          { date: '2024-01-12', status: 'Present', clockIn: '08:20', clockOut: '17:05' },
        ].map((record, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
            <div className="flex items-center space-x-3">
              <span className="text-white">{record.date}</span>
              <span className={`
                px-2 py-1 rounded text-xs font-medium
                ${record.status === 'Present' ? 'bg-green-600 text-white' : 
                  record.status === 'Late' ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'}
              `}>
                {record.status}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              {record.clockIn} - {record.clockOut}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Employee List Component
const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      employeeId: 'EMP001',
      fullName: 'John Doe',
      position: 'Software Developer',
      department: 'Information Technology',
      phone: '08123456789',
      address: 'Jakarta',
      hireDate: '2024-01-01',
      salary: 8000000,
      workStartTime: '08:00',
      workEndTime: '17:00',
      isActive: true,
      status: 'Present'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      employeeId: 'EMP002',
      fullName: 'Jane Smith',
      position: 'HR Specialist',
      department: 'Human Resources',
      phone: '08123456788',
      address: 'Bandung',
      hireDate: '2024-01-15',
      salary: 7000000,
      workStartTime: '08:00',
      workEndTime: '17:00',
      isActive: true,
      status: 'Present'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@company.com',
      employeeId: 'EMP003',
      fullName: 'Mike Johnson',
      position: 'Marketing Manager',
      department: 'Marketing',
      phone: '08123456787',
      address: 'Surabaya',
      hireDate: '2023-11-20',
      salary: 9000000,
      workStartTime: '08:00',
      workEndTime: '17:00',
      isActive: true,
      status: 'Absent'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Operations', label: 'Operations' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Late', label: 'Late' }
  ];

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
    const matchesStatus = !filterStatus || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setEditMode(false);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEditMode(true);
    setShowForm(true);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDetail(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    }
  };

  const handleSaveEmployee = (formData) => {
    if (editMode && selectedEmployee) {
      // Update existing employee
      setEmployees(prev => prev.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
      ));
    } else {
      // Add new employee
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
        status: 'Present'
      };
      setEmployees(prev => [...prev, newEmployee]);
    }
    setShowForm(false);
    setSelectedEmployee(null);
  };

  const handleToggleStatus = (employeeId) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, isActive: !emp.isActive }
        : emp
    ));
  };

  return (
    <div className="min-h-screen min-w-full space-y-6 p-6 " style={{ width: "100%" }} >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Employee Management</h1>
          <p className="text-gray-400">Manage your workforce and employee information</p>
        </div>
        <button
          onClick={handleAddEmployee}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Employee</span>
        </button>
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
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
          >
            {departments.map(dept => (
              <option key={dept.value} value={dept.value}>{dept.label}</option>
            ))}
          </select>

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
              {filteredEmployees.length} of {employees.length} employees
            </span>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Employee</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Position</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Department</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-300">Active</th>
                <th className="text-right p-4 text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-800 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="text-white font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-400">{employee.employeeId}</div>
                        <div className="text-sm text-gray-400">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{employee.position}</td>
                  <td className="p-4 text-gray-300">{employee.department}</td>
                  <td className="p-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${employee.status === 'Present' ? 'bg-green-600 text-white' : 
                        employee.status === 'Late' ? 'bg-yellow-600 text-white' : 
                        'bg-red-600 text-white'}
                    `}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(employee.id)}
                      className="relative"
                    >
                      {employee.isActive ? (
                        <UserCheck className="text-green-400 hover:text-green-300" size={20} />
                      ) : (
                        <UserX className="text-red-400 hover:text-red-300" size={20} />
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewEmployee(employee)}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-colors"
                        title="Edit Employee"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No employees found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredEmployees.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing 1 to {filteredEmployees.length} of {employees.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-600 border border-blue-600 rounded-lg text-white">
              1
            </button>
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Employee Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editMode ? 'Edit Employee' : 'Add New Employee'}
        size="lg"
      >
        <EmployeeForm
          employee={editMode ? selectedEmployee : null}
          onSave={handleSaveEmployee}
          onCancel={() => setShowForm(false)}
        />
      </Modal>

      {/* Employee Detail Modal */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title="Employee Details"
        size="lg"
      >
        {selectedEmployee && (
          <EmployeeDetail
            employee={selectedEmployee}
            onClose={() => setShowDetail(false)}
            onEdit={() => {
              setShowDetail(false);
              handleEditEmployee(selectedEmployee);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default EmployeeList;