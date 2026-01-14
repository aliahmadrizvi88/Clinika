import React from 'react';

const Certification = () => {
  return (
    <div className="">
      <section className="max-w-6xl mx-auto my-12 px-6 md:px-10 py-8">
        <h1 className=" text-2xl md:text-3xl font-semibold ">
          Years of Experience
        </h1>

        <div className="border-l-4 border-[#2a89b9] pl-4">
          <p className="text-justify leading-relaxed text-base md:text-lg ">
            With over 15 years of experience in healthcare services, our Clinic
            has been serving patients with reliability, integrity, and a
            commitment to medical excellence.
          </p>

          <h2 className="text-md md:text-lg font-semibold mt-10 ">
            Certifications & Awards
          </h2>

          <div className="grid grid-cols-2 gap-8 mt-5">
            <div>
              <img src="https://placehold.co/500x300/000000/FFF" alt="" />
              <p className="text-sm text-gray-500 text-center">
                Clinic's Certificate
              </p>
            </div>

            <div>
              <img src="https://placehold.co/500x300/000000/FFF" alt="" />
              <p className="text-sm text-gray-500 text-center">
                Doctor's Certificate
              </p>
            </div>
            <div>
              <img src="https://placehold.co/500x300/000000/FFF" alt="" />
              <p className="text-sm text-gray-500 text-center">
                Clinic's Certificate
              </p>
            </div>

            <div>
              <img src="https://placehold.co/500x300/000000/FFF" alt="" />
              <p className="text-sm text-gray-500 text-center">
                Doctor's Certificate
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certification;
