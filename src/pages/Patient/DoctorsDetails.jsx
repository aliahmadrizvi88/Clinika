import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Award,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${URL}/doctors/profile/${id}`);
        setDoctor(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load doctor details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-4">
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <button
            onClick={() => navigate('/doctors')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Doctor not found</p>
          <button
            onClick={() => navigate('/doctors')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctors')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Doctors
        </button>

        {/* Doctor Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 h-32"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <User size={64} className="text-blue-600" />
              </div>
            </div>

            {/* Doctor Info */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dr. {doctor.first_name} {doctor.last_name}
              </h1>
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-4">
                <Award size={20} />
                <p className="text-lg font-medium">{doctor.specialization}</p>
              </div>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  doctor.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {doctor.is_active ? '✓ Available' : 'Unavailable'}
              </span>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-semibold text-gray-800">
                      {doctor.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold text-gray-800 wrap-break-words">
                      {doctor.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award size={20} className="text-blue-600" />
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">License Number</p>
                  <p className="font-semibold text-gray-800">
                    {doctor.licence_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(doctor.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Calendar className="text-yellow-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Appointment Information
                  </h4>
                  <p className="text-sm text-gray-600">
                    To schedule an appointment with Dr. {doctor.first_name}{' '}
                    {doctor.last_name}, please contact our reception desk or
                    call the number provided above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Why Choose Dr. {doctor.last_name}?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={20} />
              <p className="text-gray-700">
                Highly qualified {doctor.specialization} specialist
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={20} />
              <p className="text-gray-700">
                Licensed medical professional with verified credentials
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={20} />
              <p className="text-gray-700">
                Committed to providing excellent patient care
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={20} />
              <p className="text-gray-700">
                Available for consultations and medical advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
