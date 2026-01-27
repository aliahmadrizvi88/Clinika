import { useNavigate } from 'react-router-dom';

const ProfileActions = ({ doctor }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('edit is clicked');
  };

  const handleDeactivate = () => {
    alert('Deactivate API will be added later');
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={handleEdit}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Edit Profile
      </button>

      {doctor.is_active && (
        <button
          onClick={handleDeactivate}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Delete Account
        </button>
      )}
    </div>
  );
};

export default ProfileActions;
