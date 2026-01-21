import React, { useState } from 'react';
import { MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

const UniList = ({
  columns = [],
  data = [],
  loading = false,
  pageSize = 10,
  actions = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

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
      {/* Header (shown once) */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))_40px] bg-[#3bbb9c] text-white px-4 py-3 font-medium">
        {columns.map((col) => (
          <div key={col.key} className="text-center">
            {col.label}
          </div>
        ))}
        <div />
      </div>

      {/* Rows */}
      <div className="">
        {currentData.map((row, index) => (
          <div
            key={row._id || index}
            className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))_40px] items-center px-4 py-3 hover:bg-[#2a89b9] hover:text-white transition relative"
          >
            {columns.map((col) => (
              <div key={col.key} className="text-center text-sm">
                {col.render
                  ? col.render(row) // Pass the entire row object
                  : (row[col.key] ?? '-')}
              </div>
            ))}

            {/* Actions */}
            <div className="relative text-center">
              <button
                className="p-2 rounded-full hover:bg-white/20"
                onClick={() =>
                  setOpenMenuIndex(openMenuIndex === index ? null : index)
                }
              >
                <MoreVertical size={16} />
              </button>

              {openMenuIndex === index && (
                <div className="absolute right-0 mt-2 w-36 bg-white text-gray-700 shadow-lg rounded-lg z-50">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        action.onClick(row);
                        setOpenMenuIndex(null);
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

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
