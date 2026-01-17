import React from 'react';

const Button_01 = ({ label }) => {
  return (
    <div>
      <button
        className={`bg-linear-to-r from-[#2a89b9] via-[#37a2ad] to-[#3bbb9c] px-5 py-2 w-full text-white rounded-4xl font-semibold text-xl cursor-pointer hover:scale-105 hover:shadow-xl duration-300`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button_01;
