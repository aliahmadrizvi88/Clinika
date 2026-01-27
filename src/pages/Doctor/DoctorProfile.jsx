import React, { useEffect } from 'react';
import ProfileCard from '../../components/Doctor/DoctorProfile/ProfileCard';
import ProfileActions from '../../components/Doctor/DoctorProfile/ProfileActions';
import { useDoctor } from '../../context/Doctor/useDoctor';

const DoctorProfile = () => {
  const { doctorProfile, fetchDoctorProfile, loading, error } = useDoctor();

  useEffect(() => {
    fetchDoctorProfile();
  }, [fetchDoctorProfile]);

  if (loading) return <div className="p-6">Loading profile...</div>;

  if (error) {
    return <div className="p-6 text-red-600 bg-red-100 rounded">{error}</div>;
  }

  if (!doctorProfile) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProfileCard doctor={doctorProfile} />
      <ProfileActions doctor={doctorProfile} />
    </div>
  );
};

export default DoctorProfile;
