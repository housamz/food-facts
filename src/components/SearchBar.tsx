import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  startScan: boolean;
  setStartScan: (trigger: boolean) => void;
  setNotFound: (value: boolean) => void;
};

const SearchBar = ({
  onSearch,
  startScan,
  setStartScan,
  setNotFound,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setNotFound(false);
    onSearch(query);
  };

  const handleStartScan = () => {
    setStartScan(!startScan);
    setNotFound(false);
  };

  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded flex-1"
        placeholder="Search.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="ml-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="ml-4 p-2 bg-green-500 text-white rounded"
        onClick={handleStartScan}
      >
        Scan Barcode
      </button>
    </div>
  );
};

export default SearchBar;
