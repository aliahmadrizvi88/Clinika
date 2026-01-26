const AppointmentActions = ({ onComplete }) => {
  return (
    <div className="flex justify-end gap-3">
      <button
        onClick={onComplete}
        className="px-6 py-2 bg-[#3bbb9c] text-white rounded-lg"
      >
        Complete Appointment
      </button>
    </div>
  );
};

export default AppointmentActions;
