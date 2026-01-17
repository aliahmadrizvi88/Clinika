import { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedToken = localStorage.getItem('doc_token');
    const storedDoctor = localStorage.getItem('doc_data');

    return {
      doctor: storedDoctor ? JSON.parse(storedDoctor) : null,
      token: storedToken || null,
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
