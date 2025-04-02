import { useState } from "react";
import { Search, UserTable } from "../components";

const Home = () => {
  const [activeStatus, setActiveStatus] = useState("All");

  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Main St", status: "In progress" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", address: "456 Oak St", status: "Waiting" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", phone: "555-555-5555", address: "789 Pine St", status: "Reject" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", phone: "222-333-4444", address: "321 Elm St", status: "Done" },
  ];

  const filteredUsers = activeStatus === "All" ? users : users.filter(user => user.status === activeStatus);

  const handleSearch = (query: string, type: string) => {
    console.log("Searching for:", query, "Type:", type);
    // TODO: Implement API call or filtering logic
  };

  const handleAddUser = () => {
    alert("Add User Clicked! Implement user creation modal or form.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-3">
      <Search onSearch={handleSearch} />

      {/* Add User Button */}
      <div className="w-full max-w-5xl flex justify-start mt-4">
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + THÊM
        </button>
      </div>

       {/* Navbar for status filter */}
       <div className="w-full mt-4 bg-white shadow-sm rounded-md p-2 flex space-x-4">
        {["All", "In progress", "Waiting", "Reject", "Done"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeStatus === status ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-700 hover:text-blue-500"
            }`}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="w-full mt-4 overflow-x-auto">
        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
};

export default Home;
