import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserTable } from "../components";
import { UserStatus } from "../constants";
import { useUserStatus } from "hooks";

const Home = () => {
  const navigate = useNavigate();
  const { statuses, visibleStatuses, addVisibleStatus, removeVisibleStatus } = useUserStatus()

  const [activeStatus, setActiveStatus] = useState<string>("Tất cả");
  const [users, setUsers] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Load users from localStorage
    const stored = localStorage.getItem("users");
    const parsed = stored ? JSON.parse(stored) : [];
    console.log("vao day 1", parsed)
    setUsers(parsed)
  }, []);

  const handleSearch = (query: string, type: string) => {
    console.log("Searching for:", query, "Type:", type);
  };

  const toggleVisibility = (status: string) => {
    if (!visibleStatuses.includes(status)) {
      addVisibleStatus(status);
    } else {
      removeVisibleStatus(status)
    }
  };

  const filteredUsers = activeStatus.includes("Tất cả") ? users : users.filter((user) => activeStatus.includes(user.status))

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-3">
      <Search onSearch={handleSearch} />

      {/* Add User Button */}
      <div className="w-full flex mt-4">
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          + THÊM
        </button>
      </div>

      {/* Left Nav: Dynamic Status Filter */}
      <div className="w-full mt-4 bg-white shadow-sm rounded-md p-2 flex justify-between items-center">
        {/* Left side filter statuses */}
        <div className="flex space-x-4 overflow-x-auto">
          {[...visibleStatuses].map((status) => (
            <div key={status} className="flex items-center gap-2">
              <button
                className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${activeStatus === status
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
                  }`}
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </button>
            </div>
          ))}
        </div>

        {/* Right Side Dropdown for Status Filters */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Lọc trạng thái
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
              <div className="p-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={visibleStatuses.includes(status)}
                      onChange={() => toggleVisibility(status)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Table */}
      <div className="w-full mt-4 overflow-x-auto">
        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
};

export default Home;
