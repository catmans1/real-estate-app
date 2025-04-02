import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ onSearch }: { onSearch: (query: string, type: string) => void }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to UserList with query params
    navigate(`/users?query=${query}`);
  };

  return (
    <div className="bg-white w-full shadow-md rounded-lg p-4 flex items-center gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Tên khách hàng, số điện thoại..."
        className="border p-2 rounded-md w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Search Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={handleSearch}
      >
        Tìm
      </button>
    </div>
  );
};

export default Search;
