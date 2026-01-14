import React from 'react';

const CoreValue = () => {
  return (
    <div>
      <section className="max-w-6xl mx-auto my-12 md:px-10 py-8">
        <h1 className=" text-2xl md:text-3xl font-semibold ">Core Value</h1>

        <div className="grid grid-cols-3 my-2 gap-4">
          <div className="text-justify leading-relaxed text-base md:text-lg border-2 border-gray-300 p-4 rounded-lg hover:scale-105 duration-200">
            <div className="border-l-4 border-[#2a89b9] pl-2">
              <h3 className="m-2 font-semibold text-[20px]">Care</h3>
              <p className=" m-2 text-[16px]">
                We treat every patient with empathy, dignity, and respect.
              </p>
            </div>
          </div>

          <div className="text-justify leading-relaxed text-base md:text-lg border-2 border-gray-300 p-4 rounded-lg hover:scale-105 duration-200">
            <div className="border-l-4 border-[#37a2ad] pl-2">
              <h3 className="m-2 font-semibold text-[20px]">Safety</h3>
              <p className=" m-2 text-[16px]">
                We follow strict clinical protocols to ensure patient and staff
                safety.
              </p>
            </div>
          </div>

          <div className="text-justify leading-relaxed text-base md:text-lg border-2 border-gray-300 p-4 rounded-lg hover:scale-105 duration-200">
            <div className="border-l-4 border-[#3bbb9c] pl-2">
              <h3 className="m-2 font-semibold text-[20px]">Innovation</h3>
              <p className=" m-2 text-[16px]">
                We adopt modern medical technologies and digital solutions to
                improve healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoreValue;
