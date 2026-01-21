import React, { useEffect } from 'react';
import UniTable from '../../components/Doctor/UniTable';
import { useDoctor } from '../../context/Doctor/useDoctor';
import { useAuth } from '../../context/Auth/DoctorAuth/useAuth';

const PatientList = () => {
  const { patients, loading, fetchPatients } = useDoctor();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchPatients();
    }
  }, [token]);

  const columns = [
    {
      key: 'full_name',
      label: 'Name',
      render: (row) =>
        `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'N/A',
    },
    {
      key: 'gender',
      label: 'Gender',
      render: (row) => row.gender || 'N/A',
    },
    {
      key: 'blood_group',
      label: 'Blood Group',
      render: (row) =>
        row.blood_group || row.bloodGroup || row.bloodtype || 'N/A',
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (row) =>
        row.phone || row.phone_number || row.phoneNumber || 'N/A',
    },
  ];

  const actions = [
    { label: 'View', onClick: (row) => console.log('View', row) },
    { label: 'Edit', onClick: (row) => console.log('Edit', row) },
    { label: 'Delete', onClick: (row) => console.log('Delete', row) },
  ];

  return (
    <div className="mx-10 my-5">
      <h1 className="font-extrabold text-2xl mb-5">
        Patient List ({patients.length})
      </h1>
      <UniTable
        columns={columns}
        data={patients}
        loading={loading}
        actions={actions}
      />
    </div>
  );
};

export default PatientList;
