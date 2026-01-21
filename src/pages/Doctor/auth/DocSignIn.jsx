import React, { useState } from 'react';
import Input from '../../../components/Input';
import Button_01 from '../../../components/Button_01';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/Auth/DoctorAuth/useAuth';
import api from '../../../api/api';

const DocSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', formData);

      login(res.data.id, res.data.token);

      navigate('/doctor-side/dashboard');
    } catch (err) {
      setError(err.res?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="border border-gray-300 rounded-2xl text-center px-20 py-25">
        <div className="flex items-center gap-2">
          <img src="/public/favicon.svg" alt="" className="w-20" />
          <h1 className="text-4xl font-extrabold text-[#3bbb9c]">
            Doctor's Login
          </h1>
        </div>
        <p className="py-2 text-md font-light">
          Welcome Back Doctor Please Enter your credintals to Login
        </p>

        {error && <p className="text-red-500 text-sm my-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <span className="flex justify-center items-center gap-1 my-12">
            <Input
              type="email"
              label="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="rounded-full border border-gray-300 p-3 hover:border-[#3bbb9c] hover:text-[#3bbb9c] duration-300 cursor-pointer">
              <Mail strokeWidth={1.25} />
            </div>
          </span>

          <span className="flex justify-center items-center gap-1 my-12 ">
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
              className="rounded-full border border-gray-300 p-3 hover:border-[#3bbb9c] hover:text-[#3bbb9c] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff strokeWidth={1.25} />
              ) : (
                <Eye strokeWidth={1.25} />
              )}
            </button>
          </span>

          <Button_01
            label={loading ? 'Logging in...' : 'Login'}
            className="my-15"
            disabled={loading}
          />
        </form>

        <Link to="/auth/doc-signUp" className="text-[#3bbb9c]">
          Don't have a account?
        </Link>
      </div>
    </div>
  );
};

export default DocSignIn;
