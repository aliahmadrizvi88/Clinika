const ProfileCard = ({ doctor }) => {
  return (
    <>
      <h1 className="font-extrabold text-2xl mb-5">Your Profile</h1>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-start gap-6 mb-8 pb-8 ">
          <div className="w-20 h-20 bg-linear-to-br uppercase from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {doctor.first_name?.charAt(0)}
            {doctor.last_name?.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold mb-4 capitalize">
            Dr. {doctor.first_name} {doctor.last_name}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Specialization:</strong> {doctor.specialization}
          </p>
          <p>
            <strong>License No:</strong> {doctor.licence_number}
          </p>
          <p>
            <strong>Email:</strong> {doctor.email}
          </p>
          <p>
            <strong>Phone:</strong> {doctor.phone}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`px-2 py-1 rounded text-xs ${
                doctor.is_active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {doctor.is_active ? 'Active' : 'Inactive'}
            </span>
          </p>
          <p>
            <strong>Joined:</strong>{' '}
            {new Date(doctor.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
