import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api'; // Axios instance for register endpoint[cite: 1]

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'student' // Default role as per backend[cite: 1]
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Backend Register API call as per specification[cite: 1]
      const response = await api.post('/auth/register', formData);
      
      if (response.status === 201) {
        // Automatically save tokens if backend logs them in instantly[cite: 1]
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        navigate('/login'); // Successfully registered, take them to login page[cite: 1]
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050D1D] via-[#0A1A3A] to-[#102552] font-inter px-4 py-12 relative overflow-hidden">
      
      {/* Decorative Backglows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#C9A03D]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#E8F0FE]/5 rounded-full blur-[120px]" />

      {/* Registration Card */}
      <div className="bg-[#0A1A3A]/80 backdrop-blur-md text-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-[#C9A03D]/30 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-[#C9A03D]/10 p-3 rounded-full mb-2 text-[#C9A03D]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-playfair font-bold tracking-wide">
            Create <span className="text-[#C9A03D]">Account</span>[cite: 1]
          </h2>
          <p className="text-xs text-gray-400 mt-1 tracking-widest uppercase">Academy Portal Registration</p>
        </div>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-300">
              Full Name
            </label>
            <input 
              type="text" 
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-2.5 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-[#C9A03D] focus:ring-1 focus:ring-[#C9A03D] transition-all duration-200 text-sm"
              required 
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-300">
              Email Address
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full p-2.5 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-[#C9A03D] focus:ring-1 focus:ring-[#C9A03D] transition-all duration-200 text-sm"
              required 
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-300">
              Phone Number
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
              className="w-full p-2.5 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-[#C9A03D] focus:ring-1 focus:ring-[#C9A03D] transition-all duration-200 text-sm"
              required 
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-300">
              Portal Role
            </label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl bg-[#0A1A3A] border border-gray-600 text-white outline-none focus:border-[#C9A03D] focus:ring-1 focus:ring-[#C9A03D] transition-all duration-200 text-sm"
            >
              <option value="student">Student</option>
              <option value="trainer">Trainer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-2.5 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-[#C9A03D] focus:ring-1 focus:ring-[#C9A03D] transition-all duration-200 text-sm pr-12"
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C9A03D] text-xs font-semibold focus:outline-none"
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#C9A03D] hover:bg-[#b08b32] text-[#0A1A3A] font-bold py-3 rounded-xl transition-all duration-300 mt-4 shadow-lg shadow-[#C9A03D]/20 hover:shadow-[#C9A03D]/30 active:scale-[0.99] disabled:opacity-50 text-sm"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 pt-3 border-t border-white/5">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C9A03D] hover:underline font-semibold ml-1">
              Sign In[cite: 1]
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;