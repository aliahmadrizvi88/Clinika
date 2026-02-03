import React, { useEffect, useMemo } from 'react';
import { useHospital } from '../../context/useHospital';
import DoctorCard from '../../components/Patients/DoctorCard';
import { Stethoscope, Search } from 'lucide-react';

const DoctorPortfolio = () => {
  const { doctor, fetchDoctor, loading, error } = useHospital();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    fetchDoctor();
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!doctor) return [];

    return doctor.filter(
      (doc) =>
        doc.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [doctor, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our expert doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl max-w-md">
          <p className="font-semibold">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-[#2a89b9] via-[#37a2ad] to-[#3bbb9c] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope size={40} />
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Our Expert Doctors
            </h1>
          </div>
          <p className="text-center text-blue-100 text-lg max-w-2xl mx-auto">
            Meet our team of highly qualified and experienced medical
            professionals dedicated to your health and well-being
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16">
            <Stethoscope size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'No doctors available at the moment'}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-600">
                Showing{' '}
                <span className="font-semibold text-blue-600">
                  {filteredDoctors.length}
                </span>{' '}
                {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc._id} doctor={doc} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorPortfolio;
