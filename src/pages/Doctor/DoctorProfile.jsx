import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, Star, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../../components/Doctor/DoctorProfile/ProfileCard';
import ProfessionalInfo from '../../components/Doctor/DoctorProfile/ProfessionalInfo';
import ContactInfo from '../../components/Doctor/DoctorProfile/ContactInfo';
import UniversalDialog from '../../components/UniversalDialog';
import EditDoctorProfileForm from '../../components/Doctor/EditDoctorProfileForm';
import { useDoctor } from '../../context/Doctor/useDoctor';

const DoctorProfile = () => {
  const {
    doctorProfile,
    fetchDoctorProfile,
    updateDoctorProfile,
    loading,
    error,
  } = useDoctor();
  const navigate = useNavigate();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    if (!doctorProfile) {
      fetchDoctorProfile();
    }
  }, [doctorProfile, fetchDoctorProfile]);

  const handleEditProfile = async (formData) => {
    setEditLoading(true);
    setEditError(null);

    try {
      await updateDoctorProfile(formData);
      setOpenEditDialog(false);
      await fetchDoctorProfile();
    } catch (err) {
      setEditError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  };

  if (loading && !doctorProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !doctorProfile) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl">
          <p className="font-semibold">Error loading profile</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!doctorProfile) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-gray-500">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className=" sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <p className="text-sm text-gray-500">
                  Manage your professional information
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpenEditDialog(true)}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg hover:shadow-xl cursor-pointer"
            >
              <Edit size={18} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-start items-start">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard doctor={doctorProfile} />

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Star className="text-blue-600" size={20} />
                    </div>
                    <span className="text-gray-700">Rating</span>
                  </div>
                  <span className="font-semibold text-gray-900">4.8/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="text-purple-600" size={20} />
                    </div>
                    <span className="text-gray-700">Patients</span>
                  </div>
                  <span className="font-semibold text-gray-900">500+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <ProfessionalInfo doctor={doctorProfile} />
            <ContactInfo doctor={doctorProfile} />
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <UniversalDialog
        open={openEditDialog}
        onClose={() => {
          if (!editLoading) {
            setOpenEditDialog(false);
            setEditError(null);
          }
        }}
        type="form"
        title="Edit Profile"
        size="xl"
      >
        {editError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {editError}
          </div>
        )}
        <EditDoctorProfileForm
          doctor={doctorProfile}
          onSubmit={handleEditProfile}
          onCancel={() => setOpenEditDialog(false)}
          loading={editLoading}
        />
      </UniversalDialog>
    </div>
  );
};

export default DoctorProfile;
