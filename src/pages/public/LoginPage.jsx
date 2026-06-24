import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserProfile } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(result)) {
      dispatch(fetchUserProfile());
      navigate('/'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050D1D] via-[#0A1A3A] to-[#102552] font-inter px-4 relative overflow-hidden">
      
      {/* Backglow Designs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#C9A03D]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#E8F0FE]/5 rounded-full blur-[120px]" />

      {/* Login Card */}
      <div className="bg-[#0A1A3A]/80 backdrop-blur-md text-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-[#C9A03D]/30 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#C9A03D]/10 p-3 rounded-full mb-3 text-[#C9A03D]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h2 className="text-3xl font-playfair font-bold tracking-wide">
            Maritime <span className="text-[#C9A03D]">Academy</span>[cite: 1]
          </h2>
          <p className="text-xs text-gray-400 mt-2 tracking-widest uppercase">Portal Sign In</p>
        </div>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-300">
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-3 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-[#C9A03D] focus:ring-1 focus:ring-[#C9A03D] transition-all duration-200 text-sm"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-white/5 border border-gray-600 text-white placeholder-gray-500 outline-none focus:border-[#C9A03D] focus:ring-1 focus:ring-[#C9A03D] transition-all duration-200 text-sm pr-12"
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
            className="w-full bg-[#C9A03D] hover:bg-[#b08b32] text-[#0A1A3A] font-bold py-3.5 rounded-xl transition-all duration-300 mt-6 shadow-lg shadow-[#C9A03D]/20 hover:shadow-[#C9A03D]/30 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-8 pt-4 border-t border-white/5">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#C9A03D] hover:underline font-semibold ml-1">
              Register here[cite: 1]
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;