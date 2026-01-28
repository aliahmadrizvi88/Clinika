import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mars, Venus, Search } from 'lucide-react';
import UniTable from '../../components/Doctor/UniTable';
import AddPatientModal from '../../components/Doctor/AddPatientModel';
import { useDoctor } from '../../context/Doctor/useDoctor';
import { useAuth } from '../../context/Auth/DoctorAuth/useAuth';

const PatientList = () => {
  const { patients, loading, fetchPatients, addPatient } = useDoctor();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchPatients();
    }
  }, [token, fetchPatients]);

  // Filter patients based on search
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
    const phone = (patient.phone || patient.phone_number || '').toLowerCase();
    const email = (patient.email || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      fullName.includes(search) ||
      phone.includes(search) ||
      email.includes(search)
    );
  });

  const handleAddPatient = async (formData) => {
    setAddLoading(true);
    setAddError(null);

    try {
      await addPatient(formData);
      setIsModalOpen(false);
      await fetchPatients(); // Refresh list
    } catch (err) {
      setAddError(err.response?.data?.message || 'Failed to add patient');
    } finally {
      setAddLoading(false);
    }
  };

  const columns = [
    {
      key: 'full_name',
      label: 'Patient Name',
      render: (row) => {
        const name = `${row.first_name || ''} ${row.last_name || ''}`.trim();
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {row.first_name?.charAt(0)}
              {row.last_name?.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{name || 'N/A'}</p>
              <p className="text-sm text-gray-500">{row.email || 'No email'}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'gender',
      label: 'Gender',
      render: (row) => (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {row.gender || 'N/A'}
        </span>
      ),
    },
    {
      key: 'blood_group',
      label: 'Blood Group',
      render: (row) => {
        const bloodGroup = row.blood_group || row.bloodGroup || row.bloodtype;
        return bloodGroup ? (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            {bloodGroup}
          </span>
        ) : (
          <span className="text-gray-400">N/A</span>
        );
      },
    },
    {
      key: 'phone',
      label: 'Contact',
      render: (row) => {
        const phone = row.phone || row.phone_number || row.phoneNumber;
        return (
          <div>
            <p className="text-gray-900">{phone || 'N/A'}</p>
            {row.city && (
              <p className="text-sm text-gray-500">
                {row.city}, {row.state || ''}
              </p>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="mx-10 my-5">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-extrabold text-3xl text-gray-800">
            Patient List
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and view all your patients ({filteredPatients.length} total)
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg hover:shadow-xl"
        >
          <UserPlus size={20} />
          Add New Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">
                Total Patients
              </p>
              <p className="text-3xl font-bold text-blue-900 mt-1">
                {patients.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <UserPlus className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">
                Male Patients
              </p>
              <p className="text-3xl font-bold text-green-900 mt-1">
                {
                  patients.filter((p) => p.gender?.toLowerCase() === 'male')
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              <Mars />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-600 text-sm font-medium">
                Female Patients
              </p>
              <p className="text-3xl font-bold text-pink-900 mt-1">
                {
                  patients.filter((p) => p.gender?.toLowerCase() === 'female')
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              <Venus />
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {addError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {addError}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredPatients.length === 0 && searchTerm && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No patients found
          </h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}

      {!loading && patients.length === 0 && !searchTerm && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <UserPlus className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No patients yet
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first patient
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add First Patient
          </button>
        </div>
      )}

      {/* Patient Table */}
      {filteredPatients.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <UniTable
            columns={columns}
            data={filteredPatients}
            loading={loading}
            onView={(row) => navigate(`/doctor-side/list/${row._id || row.id}`)}
          />
        </div>
      )}

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setAddError(null);
        }}
        onSubmit={handleAddPatient}
        loading={addLoading}
        error={addError}
      />
    </div>
  );
};

export default PatientList;
