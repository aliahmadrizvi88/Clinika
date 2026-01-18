import React from 'react';
import { Search, Plus } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-72">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          placeholder="Search appointments..."
          className="w-full pl-10 py-2 rounded-xl border outline-none focus:border-[#3bbb9c]"
        />
      </div>

      <button className="font-bold bg-[#2a89b9] text-white px-4 py-2 rounded-xl flex items-center gap-3 cursor-pointer">
        <Plus size={18} /> Add Patient
      </button>
    </div>
  );
};

export default TopBar;
