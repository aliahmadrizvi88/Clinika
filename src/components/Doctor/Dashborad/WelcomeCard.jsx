import React from 'react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const WelcomeCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">{getGreeting()} Doctor</h1>
        <p className="text-gray-500 mt-1">Have a productive day at work</p>
      </div>

      <img
        src="/src/assets/Image/Illustration/Doc.png"
        alt="Doctor"
        className="h-40 hidden md:block"
      />
    </div>
  );
};

export default WelcomeCard;
