import React from 'react';
// import Deparments from '../../components/Patients/HomePage/Deparments';
import Certification from '../../components/Patients/HomePage/Certification';
import CoreValue from '../../components/Patients/HomePage/CoreValue';

const Home = () => {
  return (
    <div className="">
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[60vh] overflow-hidden">
        <img
          src="/src/assets/Banner.png"
          alt="Hospital Interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-6 text-white max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Advanced Healthcare Facilities
            </h1>
            <p className="mt-4 text-base md:text-lg">
              Modern hospital management with patient-focused care.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto my-12 px-6 md:px-10 py-8 text-white bg-linear-to-r from-[#2a89b9] via-[#37a2ad] to-[#3bbb9c] rounded-xl shadow-sm">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Mission & Vision
        </h2>
        <p className="text-justify leading-relaxed text-base md:text-lg border-l-4 border-white pl-4">
          Our mission is to deliver high-quality, patient-centered healthcare
          through compassionate service, skilled medical professionals, and
          modern technology. Our vision is to become a trusted healthcare
          provider by continuously improving clinical outcomes, patient safety,
          and accessibility of care for our community.
        </p>
      </section>

      <Certification />
      <CoreValue />

      {/* <Deparments /> */}
    </div>
  );
};

export default Home;
