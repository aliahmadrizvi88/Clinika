import React from 'react';
import {
  emergencyIcon,
  pharmacy,
  gernelIcon,
  cardicIcon,
  orthoIcon,
  prediaIcon,
} from '../../../assets/Icons/index';

const Deparments = () => {
  const icons = [
    { name: 'emergency', icon: emergencyIcon },
    { name: 'gernel', icon: gernelIcon },
    { name: 'cardiology', icon: cardicIcon },
    { name: 'orthopedics', icon: orthoIcon },
    { name: 'pediatric', icon: prediaIcon },
    { name: 'pharmacy', icon: pharmacy },
  ];
  return (
    <div>
      <section className="max-w-6xl mx-auto my-12 px-6 md:px-10 py-8">
        <h2 className="text-2xl md:text-3xl font-semibold  mb-4">
          Departments
        </h2>

        <div className="grid grid-cols-3 gap-5" key={icons.name}>
          {icons.map((item) => (
            <button>
              <img
                src={item.icon}
                alt={item.name}
                className="w-25 p-2 shadow-md rounded-2xl hover:shadow-[#2a89b9] hover:translate-y- cursor-pointer duration-200"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Deparments;
