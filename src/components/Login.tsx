import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, Lock, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'abc@gmail.com' && password === '12345') {
      onLogin();
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-25 animate-bounce"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              SkillSaathi
            </h1>
            <p className="text-white/60 text-lg"> Swap skills , Spark Growth</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 text-white rounded-2xl border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg transition-all duration-300"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 text-white rounded-2xl border border-white/20 focus:border-white/40 focus:outline-none backdrop-blur-lg transition-all duration-300"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl text-sm backdrop-blur-lg">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 font-semibold text-lg"
            >
              Enter the SkillSaathi
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-white/60 text-sm text-center">
              <strong className="text-white/80">Demo Credentials:</strong><br />
              Email: abc@gmail.com<br />
              Password: 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 