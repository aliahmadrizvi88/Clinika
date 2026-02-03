import React from 'react';
import { User, Mail, Phone, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Doctor Avatar */}
      <div className="bg-linear-to-r from-[#2a89b9] via-[#37a2ad] to-[#3bbb9c] h-32 flex items-center justify-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          <User size={48} className="text-blue-600" />
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Dr. {doctor.first_name} {doctor.last_name}
          </h3>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Award size={16} />
            <p className="text-sm font-medium">{doctor.specialization}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Phone size={14} className="text-green-600" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Mail size={14} className="text-blue-600" />
            <span className="truncate">{doctor.email}</span>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/doctors/${doctor.id}`)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Profile
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
