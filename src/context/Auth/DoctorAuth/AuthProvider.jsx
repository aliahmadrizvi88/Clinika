import { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('doc_token');
    const doctorRaw = localStorage.getItem('doc_data');

    let doctor = null;

    try {
      doctor = doctorRaw ? JSON.parse(doctorRaw) : null;
    } catch (err) {
      console.error('Invalid doctor data in localStorage, clearing it', err);
      localStorage.removeItem('doc_data');
      doctor = null;
    }

    return {
      doctor,
      token,
      loading: false,
    };
  });

  const login = (doctorData, token) => {
    localStorage.setItem('doc_token', token);
    localStorage.setItem('doc_data', JSON.stringify(doctorData));

    setAuthState({
      doctor: doctorData,
      token,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('doc_token');
    localStorage.removeItem('doc_data');

    setAuthState({
      doctor: null,
      token: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isAuthenticated: !!authState.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
