import { UserTable } from "components";
import { useLocation } from "react-router-dom";

const UserList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Main St", status: "In progress" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", address: "456 Oak St", status: "Waiting" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", phone: "555-555-5555", address: "789 Pine St", status: "Reject" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", phone: "222-333-4444", address: "321 Elm St", status: "Done" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <UserTable users={users} />
    </div>
  );
};

export default UserList;
