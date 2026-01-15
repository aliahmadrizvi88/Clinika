import { useEffect } from 'react';
import { useHospital } from '../../../context/useHospital';
import { Mail, BriefcaseMedical } from 'lucide-react';

const Doctor = () => {
  const { fetchDoctor, doctor, error, loading } = useHospital();

  useEffect(() => {
    fetchDoctor();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error}</p>;
  }

  return (
    <div>
      <section className="max-w-6xl mx-auto my-12 px-6 md:px-10 py-8 ">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Doctors</h2>

        <div className="grid grid-cols-2 gap-2">
          {doctor.map((doc) => (
            <div className="text-justify leading-relaxed text-base md:text-lg border-2 border-gray-300 p-4 rounded-lg hover:-translate-y-2 hover:shadow-xl hover:shadow-[#37a2ad] duration-200">
              <div className="flex justify-between items-center">
                <div className="border-l-4 border-[#37a2ad] pl-2 mr-4">
                  <h3
                    className=" font-semibold text-2xl capitalize"
                    key={doc.id}
                  >
                    Dr. {doc.first_name} {doc.last_name}
                  </h3>

                  <p className="flex items-center justify-baseline gap-2">
                    <BriefcaseMedical size={22} strokeWidth={1.25} />
                    {doc.specialization}
                  </p>

                  <p className="flex items-center justify-baseline gap-2">
                    <Mail size={22} strokeWidth={1.25} />
                    {doc.email}
                  </p>
                </div>

                <img
                  src="https://cdn.vectorstock.com/i/1000v/78/32/male-doctor-with-stethoscope-avatar-vector-31657832.jpg"
                  alt="doctor Image"
                  className="h-50 w-50 rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Doctor;
