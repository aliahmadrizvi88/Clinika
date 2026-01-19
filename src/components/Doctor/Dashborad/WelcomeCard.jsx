import React from 'react';
const WelcomeCard = () => {
  return (
    <div className="bg-[#f6f8fc] rounded-2xl p-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">Good Morning, Doctor</h1>
        <p className="text-gray-500 mt-1">Have a productive day at work</p>
      </div>

      <img
        src="/doctor-illustration.png"
        alt=""
        className="h-32 hidden md:block"
      />
    </div>
  );
};

export default WelcomeCard;
