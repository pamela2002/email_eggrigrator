import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <input
        type="text"
        placeholder="Search emails..."
        className="flex-grow p-2 border rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
