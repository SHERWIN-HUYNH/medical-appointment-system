import React, { useState } from "react";

type TableSearchProps = {
  onSearch: (searchTerm: string) => void;
};

const TableSearch: React.FC<TableSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-md"
        placeholder="Tìm kiếm tên người dùng"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-primary text-white rounded-md"
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default TableSearch;
