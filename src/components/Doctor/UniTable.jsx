import React, { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const UniList = ({
  columns = [],
  data = [],
  loading = false,
  pageSize = 10,
  onView, // NEW PROP
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-400">
        No data available
      </div>
    );
  }

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))_40px] bg-[#3bbb9c] text-white px-4 py-3 font-medium">
        {columns.map((col) => (
          <div key={col.key} className="text-center">
            {col.label}
          </div>
        ))}
        <div className="text-center">View</div>
      </div>

      {/* Rows */}
      {currentData.map((row, index) => (
        <div
          key={row._id || index}
          className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))_40px] items-center px-4 py-3 hover:bg-[#2a89b9] hover:text-white transition"
        >
          {columns.map((col) => (
            <div key={col.key} className="text-center text-sm">
              {col.render ? col.render(row) : (row[col.key] ?? '-')}
            </div>
          ))}

          {/* View Action */}
          <div className="text-center">
            <button
              onClick={() => onView?.(row)}
              className="p-2 rounded-full hover:bg-white/20"
              title="View"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 p-4 text-gray-600">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full border disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full border disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default UniList;
