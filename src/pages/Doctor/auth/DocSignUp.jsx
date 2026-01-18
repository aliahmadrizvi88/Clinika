import React, { useState } from 'react';
import Button_01 from '../../../components/Button_01';
import Input from '../../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/Auth/DoctorAuth/useAuth';
import api from '../../../api/api';

import {
  Mail,
  Eye,
  EyeOff,
  BriefcaseMedical,
  CreativeCommons,
} from 'lucide-react';

const DocSignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    licence_number: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/register', {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        specialization: formData.specialization,
        licence_number: formData.licence_number,
      });

      // Save auth state
      login(res.data.doctor, res.data.token);

      // Redirect to dashboard
      navigate('/doctor-side/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-300 rounded-2xl text-center px-20 py-10 w-full max-w-3xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/public/favicon.svg" alt="Logo" className="w-20" />
          <h1 className="text-4xl font-extrabold text-[#3bbb9c]">
            Doctor&apos;s Sign Up
          </h1>
        </div>

        <p className="py-2 text-md font-light mb-6">
          Please enter your information carefully
        </p>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex gap-4 my-8">
            <Input
              type="text"
              label="First Name"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Last Name"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 my-8">
            <Input
              type="email"
              label="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="rounded-full border border-gray-300 p-3">
              <Mail strokeWidth={1.25} />
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 my-8">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="rounded-full border border-gray-300 p-3"
            >
              {showPassword ? (
                <EyeOff strokeWidth={1.25} />
              ) : (
                <Eye strokeWidth={1.25} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-2 my-8">
            <Input
              type={showConfirm ? 'text' : 'password'}
              label="Confirm Password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="rounded-full border border-gray-300 p-3"
            >
              {showConfirm ? (
                <EyeOff strokeWidth={1.25} />
              ) : (
                <Eye strokeWidth={1.25} />
              )}
            </button>
          </div>

          {/* Specialization */}
          <div className="flex items-center gap-2 my-8">
            <Input
              type="text"
              label="Specialization"
              id="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
            <div className="rounded-full border border-gray-300 p-3">
              <BriefcaseMedical strokeWidth={1.25} />
            </div>
          </div>

          {/* Licence */}
          <div className="flex items-center gap-2 my-8">
            <Input
              type="text"
              label="Licence Number"
              id="licence_number"
              value={formData.licence_number}
              onChange={handleChange}
              required
            />
            <div className="rounded-full border border-gray-300 p-3">
              <CreativeCommons strokeWidth={1.25} />
            </div>
          </div>

          <Button_01
            type="submit"
            label={loading ? 'Signing up...' : 'Sign Up'}
            disabled={loading}
            className="my-10"
          />
        </form>

        <Link to="/auth/doc-signIn" className="text-[#3bbb9c] text-sm">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default DocSignUp;
