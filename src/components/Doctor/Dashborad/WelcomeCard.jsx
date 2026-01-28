import React from 'react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const WelcomeCard = () => {
  return (
    <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl text-blue-600 font-semibold">
          {getGreeting()} Doctor
        </h1>
        <p className="text-blue-500 mt-1">Have a productive day at work</p>
      </div>

      <img
        src="/src/assets/Image/Illustration/Doc.png"
        alt="Doctor"
        className="h-50 hidden md:block rounded-full"
      />
    </div>
  );
};

export default WelcomeCard;
