import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { DigifyLogo } from '../components/DigifyLogo';
import { adminApi, AdminUser } from './adminApi';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToWebsite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Please enter your administrator email or username.');
      return;
    }

    if (!password) {
      setError('Please enter your administrator password.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await adminApi.login(username, password);
      onLoginSuccess(result.user);
    } catch (err: any) {
      setError(err.message || 'Invalid administrator email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setUsername('admin@digify.com');
    setPassword('admin2026');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#041238] via-[#08205c] to-[#040d25] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background ambient radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Header Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <DigifyLogo size="md" showSubtitle={true} />
        </div>

        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-sky-200 hover:text-white transition-colors border border-white/15"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Digify Website</span>
        </button>
      </header>

      {/* Main Login Card Center */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className="rounded-3xl bg-white text-slate-900 border border-slate-200 p-8 sm:p-10 shadow-2xl relative">
          
          {/* Card Title & Icon */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Authorized DIGIFY staff and management authentication
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            {/* Username/Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="admin-username" className="block text-xs font-bold text-slate-700">
                Administrator Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@digify.com"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] mt-2"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Box for Academic Evaluators */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>Academic Evaluation Credentials:</span>
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoCredentials}
                  className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
                >
                  Auto-Fill
                </button>
              </div>
              <div className="font-mono text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-blue-100 space-y-0.5">
                <div>Email: <strong className="text-blue-900">admin@digify.com</strong></div>
                <div>Password: <strong className="text-blue-900">admin2026</strong></div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Protected Area · Server-side Authenticated</span>
            </span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-sky-200/60 pt-6">
        © 2026 DIGIFY. Digital Services Business · Authorized Management Access.
      </footer>
    </div>
  );
};
