const ContactInfo = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Contact Information</h3>
      <div className="space-y-2 text-sm">
        <p>
          <strong>Email:</strong> {doctor.email || 'N/A'}
        </p>
        <p>
          <strong>Phone:</strong> {doctor.phone || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
