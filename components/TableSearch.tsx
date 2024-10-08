import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const TableSearch = () => {
  return (
    <div className="flex w-full max-w-sm items-center">
      <Input
        type="text"
        placeholder="Search..."
        className="w-230 rounded-l-full bg-transparent border-slate-300 shadow-inner shadow-slate-100"
      />
      <Button type="submit" className="rounded-r-full bg-slate-200">
        <Search size={20} strokeWidth={0.75} />
      </Button>
    </div>
  );
};

export default TableSearch;
