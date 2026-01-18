import React from 'react';
import { Phone, Mail, Linkedin, Facebook, Twitter } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-sm">
      {/* Doctor Image */}
      <div className="flex justify-center mb-4">
        <img
          src={doctor.avatar || '/doctor-placeholder.png'}
          alt={doctor.firstname}
          className="w-28 h-28 rounded-full object-cover border"
        />
      </div>

      {/* Doctor Info */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Dr. {doctor.firstname} {doctor.lastname}
        </h2>

        <p className="text-sm text-[#3bbb9c] mt-1">{doctor.specialization}</p>

        <p className="text-xs text-gray-500 mt-1">
          Licence No: {doctor.licence_number}
        </p>
      </div>

      {/* Contact Buttons */}
      <div className="flex justify-center gap-3 mt-5">
        {doctor.phone && (
          <a
            href={`tel:${doctor.phone}`}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-gray-300 hover:border-[#3bbb9c] hover:text-[#3bbb9c] transition"
          >
            <Phone size={16} />
            Call
          </a>
        )}

        {doctor.email && (
          <a
            href={`mailto:${doctor.email}`}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-gray-300 hover:border-[#3bbb9c] hover:text-[#3bbb9c] transition"
          >
            <Mail size={16} />
            Email
          </a>
        )}
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mt-5">
        {doctor.linkedin && (
          <a
            href={doctor.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-[#3bbb9c]"
          >
            <Linkedin size={20} />
          </a>
        )}

        {doctor.facebook && (
          <a
            href={doctor.facebook}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-[#3bbb9c]"
          >
            <Facebook size={20} />
          </a>
        )}

        {doctor.twitter && (
          <a
            href={doctor.twitter}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-[#3bbb9c]"
          >
            <Twitter size={20} />
          </a>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
