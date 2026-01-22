import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDoctor } from '../../context/Doctor/useDoctor';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Droplet, Phone, Mail } from 'lucide-react';

const PatientDetails = () => {
  const { id } = useParams();
  const { error, loading, patientDetails, fetchPatientById } = useDoctor();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientById(id);
  }, [id, fetchPatientById]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => navigate('/doctor-side/list')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to patientDetails List
        </button>
      </div>
    );
  }

  return (
    <div className="mx-10 my-5">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/doctor-side/list')}
          className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-extrabold text-2xl">Patient Details</h1>
      </div>

      {/* patientDetails Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Profile Section */}
        <div className="flex items-start gap-6 mb-8 pb-8 border-b">
          <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {patientDetails.first_name?.charAt(0)}
            {patientDetails.last_name?.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {patientDetails.first_name} {patientDetails.last_name}
            </h2>
            <div className="flex gap-4 text-gray-600">
              <span className="flex items-center gap-2">
                <User size={16} />
                {patientDetails.gender || 'N/A'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {patientDetails.date_of_birth
                  ? new Date(patientDetails.date_of_birth).toLocaleDateString()
                  : 'N/A'}
              </span>
              <span className="flex items-center gap-2">
                <Droplet size={16} />
                {patientDetails.blood_group}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">
                  {patientDetails.phone || patientDetails.phone_number || 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{patientDetails.email || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
          <p className="text-gray-600">
            {patientDetails.address ||
              patientDetails.street_address ||
              'No address provided'}
          </p>
          {patientDetails.city && (
            <p className="text-gray-600 mt-2">
              {patientDetails.city}, {patientDetails.state || ''}{' '}
              {patientDetails.zip_code || ''}
            </p>
          )}
        </div>

        {/* Medical Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Medical Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Allergies</p>
              <p className="font-medium">
                {patientDetails.allergies || 'None reported'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Medical Conditions</p>
              <p className="font-medium">
                {patientDetails.medical_conditions || 'None reported'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Current Medications</p>
              <p className="font-medium">
                {patientDetails.medications || 'None'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Emergency Contact</p>
              <p className="font-medium">
                {patientDetails.emergency_contact_phone || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/doctor-side/list')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
          >
            Back to List
          </button>

          <button
            onClick={() => console.log('Edit patientDetails:', patientDetails)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Edit Patient
          </button>

          <button
            onClick={() => console.log('Edit patientDetails:', patientDetails)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Delete Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
