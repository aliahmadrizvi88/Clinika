import { useState } from 'react';
import { AuthContext } from './AuthContext';

// Helper functions for cookies
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name.trim() + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  }
};

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = getCookie('doc_token');
    const doctorRaw = getCookie('doc_data');

    let doctor = null;

    try {
      if (doctorRaw) {
        const decoded = decodeURIComponent(doctorRaw);
        doctor = JSON.parse(decoded);

        // If doctor is just a string (ID), convert to object
        if (typeof doctor === 'string') {
          doctor = { id: doctor, _id: doctor };
        }
      }
    } catch (err) {
      console.error('Invalid doctor data in cookies, clearing it', err);
      deleteCookie('doc_data');
      doctor = null;
    }

    return {
      doctor,
      token,
      loading: false,
    };
  });

  const login = (doctorData, token) => {
    // Step 1: Clear ALL old data
    deleteAllCookies();
    localStorage.clear();
    sessionStorage.clear();
    // Step 2: Ensure doctorData is an object with id
    let doctorToStore = doctorData;

    // If doctorData is just a string (ID), convert to object
    if (typeof doctorData === 'string') {
      doctorToStore = { id: doctorData, _id: doctorData };
    } else if (doctorData && !doctorData.id && !doctorData._id) {
      // If object doesn't have id or _id, add them
      doctorToStore = { ...doctorData, id: doctorData.id || doctorData._id };
    }

    // Step 3: Set new data in cookies
    setCookie('doc_token', token, 7);
    setCookie('doc_data', encodeURIComponent(JSON.stringify(doctorToStore)), 7);

    // Step 4: Update state
    setAuthState({
      doctor: doctorToStore,
      token,
      loading: false,
    });

    // Step 5: Redirect to doctor dashboard
    setTimeout(() => {
      window.location.href = '/doctor-side/dashboard';
    }, 100);
  };

  const logout = () => {
    deleteAllCookies();
    localStorage.clear();
    sessionStorage.clear();

    setAuthState({
      doctor: null,
      token: null,
      loading: false,
    });

    setTimeout(() => {
      window.location.href = '/auth/doc-signIn';
    }, 100);
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
