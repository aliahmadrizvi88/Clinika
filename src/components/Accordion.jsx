import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({
  items = [],
  allowMultiple = false,
  defaultOpenIndexes = [],
}) => {
  const [openIndexes, setOpenIndexes] = useState(defaultOpenIndexes);

  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div
            key={index}
            className="bg-white border rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium hover:bg-gray-50"
            >
              <span>{item.title}</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="px-5 py-4 border-t text-sm text-gray-600">
                {item.content}

                {item.actions?.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    {item.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => action.onClick(item)}
                        className="px-4 py-2 text-sm rounded-lg bg-[#3bbb9c] text-white hover:opacity-90"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
