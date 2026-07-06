import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserProfile } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Footer from "../../components/common/Footer";

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
      const profileResult = await dispatch(fetchUserProfile());
      const role = profileResult.payload?.role || profileResult.payload?.user?.role || result.payload?.user?.role || result.payload?.role;
      const nextPath = role === 'admin' ? '/admin' : '/dashboard';
      navigate(nextPath);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#050D1D] via-[#0A1A3A] to-[#102552] font-inter  relative overflow-hidden">
      
      {/* Backglow Designs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#C9A03D]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#E8F0FE]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Area (Centering Card) */}
      <div className="flex-1 flex items-center justify-center py-12 relative z-10">
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
              Maritime <span className="text-[#C9A03D]">Academy</span>
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
                
                {/* 👁️ Custom SVG Eye Toggle Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C9A03D] transition-colors focus:outline-none"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
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
                Register here
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* 🧭 Aapka Banya Hua Custom Footer Component */}
      <Footer />

    </div>
  );
};

export default LoginPage;